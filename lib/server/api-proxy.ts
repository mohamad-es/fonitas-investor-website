export type ProxyConfig = { upstream: string; backendHost: string; publicHost: string; development?: boolean };
const authCookies = new Set(["fonitas_access_token", "fonitas_refresh_token", "fonitas_csrf"]);
const maxBytes = 1024 * 1024;
function failure(status: number, code: string) {
  return Response.json({ error: { code } }, { status, headers: { "Cache-Control": "private, no-store", "Referrer-Policy": "no-referrer" } });
}
function backend(config: ProxyConfig): URL | null {
  try {
    const url = new URL(config.upstream);
    if (url.protocol !== "https:" || url.hostname !== config.backendHost || url.username || url.password ||
      url.pathname !== "/" || url.search || url.hash || (url.port && url.port !== "443") ||
      !/^[a-z0-9.-]+$/i.test(config.publicHost) || !config.publicHost.includes(".")) return null;
    return url;
  } catch { return null; }
}
async function bytes(stream: ReadableStream<Uint8Array> | null): Promise<Uint8Array<ArrayBuffer>> {
  if (!stream) return new Uint8Array();
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) { await reader.cancel(); throw new Error("BODY_LIMIT"); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const result = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { result.set(chunk, offset); offset += chunk.byteLength; }
  return result;
}
function cookieHeader(value: string | null) {
  return (value ?? "").split(";").map(cookie => cookie.trim()).filter(cookie => authCookies.has(cookie.split("=", 1)[0])).join("; ");
}
export async function proxyApi(request: Request, segments: string[], config: ProxyConfig, fetcher: typeof fetch = fetch): Promise<Response> {
  const origin = backend(config);
  if (!origin) return failure(503, "API_NOT_CONFIGURED");
  if (!segments.length || !["auth", "organizations"].includes(segments[0]) ||
    segments.some(segment => !/^[a-z0-9_-]+$/i.test(segment))) return failure(404, "RESOURCE_NOT_FOUND");
  const publicOrigin = `https://${config.publicHost}`;
  const incomingOrigin = request.headers.get("Origin");
  const requestOrigin = new URL(request.url);
  const localOrigin = config.development && ["localhost", "127.0.0.1", "[::1]"].includes(requestOrigin.hostname) && incomingOrigin === requestOrigin.origin;
  if (incomingOrigin && incomingOrigin !== publicOrigin && !localOrigin) return failure(403, "ORIGIN_REJECTED");
  const url = new URL(`/api/v1/${segments.join("/")}`, origin);
  url.search = new URL(request.url).search;
  const headers = new Headers({ Accept: "application/json", Origin: publicOrigin });
  const cookies = cookieHeader(request.headers.get("Cookie"));
  if (cookies) headers.set("Cookie", cookies);
  for (const name of ["X-CSRF-Token", "X-Device-Id", "Authorization"]) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }
  let body: Uint8Array | undefined;
  if (!["GET", "HEAD"].includes(request.method)) {
    if (request.body && !request.headers.get("Content-Type")?.toLowerCase().startsWith("application/json")) return failure(415, "JSON_REQUIRED");
    headers.set("Content-Type", "application/json");
    try { body = await bytes(request.body); } catch { return failure(413, "BODY_TOO_LARGE"); }
  }
  try {
    const response = await fetcher(url, {
      method: request.method, headers, body: body?.byteLength ? new TextDecoder().decode(body) : undefined,
      cache: "no-store", redirect: "error", signal: AbortSignal.timeout(15000),
    });
    if (response.status >= 300 && response.status < 400) return failure(502, "INVALID_UPSTREAM_RESPONSE");
    const resultHeaders = new Headers({ "Cache-Control": "private, no-store", "Referrer-Policy": "no-referrer" });
    if (response.status !== 204 && response.status !== 205) {
      if (!response.headers.get("Content-Type")?.includes("application/json")) return failure(502, "INVALID_UPSTREAM_RESPONSE");
      resultHeaders.set("Content-Type", "application/json");
    }
    for (const cookie of response.headers.getSetCookie()) {
      if (authCookies.has(cookie.split("=", 1)[0])) {
        resultHeaders.append("Set-Cookie", cookie.replace(/;\s*Domain=[^;]*/ig, ""));
      }
    }
    const correlation = response.headers.get("X-Correlation-Id");
    if (correlation) resultHeaders.set("X-Correlation-Id", correlation);
    const data = response.status === 204 || response.status === 205 ? null : await bytes(response.body);
    return new Response(data, { status: response.status, headers: resultHeaders });
  } catch { return failure(503, "API_UNAVAILABLE"); }
}

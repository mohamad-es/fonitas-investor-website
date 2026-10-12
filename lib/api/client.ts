export const API_BASE_URL = "/api";

export function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

export function responseData(payload: unknown): unknown {
  return isRecord(payload) ? payload.data : undefined;
}

export function errorCode(payload: unknown): string | undefined {
  return isRecord(payload) && isRecord(payload.error) && typeof payload.error.code === "string"
    ? payload.error.code : undefined;
}

export function createApiClient(baseUrl: string, fetcher: typeof fetch = fetch) {
  const relative = baseUrl === "/api";
  const base = new URL(baseUrl, "https://developers.fonitas.com");
  if (base.protocol !== "https:" && !(base.protocol === "http:" && ["localhost", "127.0.0.1", "[::1]"].includes(base.hostname))) {
    throw new Error("The API requires HTTPS or local development HTTP.");
  }
  if (base.username || base.password || base.search || base.hash) throw new Error("Invalid API base URL.");
  let csrf: string | null = null;
  let csrfPromise: Promise<string> | null = null;
  let refreshPromise: Promise<Response> | null = null;

  function send(path: string, init: RequestInit = {}) {
    if (!path.startsWith("/") || path.startsWith("//") || path.includes("..")) throw new Error("Invalid API path.");
    const headers = new Headers(init.headers);
    headers.set("Accept", "application/json");
    if (init.body) headers.set("Content-Type", "application/json");
    return fetcher((relative ? "/api" : base.href.replace(/\/$/, "")) + path, { ...init, headers, credentials: "include", cache: "no-store", redirect: "error" });
  }

  async function getCsrf() {
    if (csrf) return csrf;
    if (!csrfPromise) {
      csrfPromise = (async () => {
        const response = await send("/auth/csrf");
        const data = responseData(await response.json());
        if (!response.ok || !isRecord(data) || typeof data.csrf_token !== "string" || !data.csrf_token) throw new Error("CSRF unavailable.");
        csrf = data.csrf_token;
        return csrf;
      })().finally(() => { csrfPromise = null; });
    }
    return csrfPromise;
  }

  async function refresh() {
    if (!refreshPromise) {
      refreshPromise = send("/auth/refresh", { method: "POST" })
        .finally(() => { csrf = null; refreshPromise = null; });
    }
    return refreshPromise;
  }

  async function request(path: string, init: RequestInit = {}, authenticated = false): Promise<Response> {
    const mutation = !["GET", "HEAD", "OPTIONS"].includes((init.method ?? "GET").toUpperCase());
    async function attempt() {
      const headers = new Headers(init.headers);
      if (mutation && path !== "/auth/refresh") headers.set("X-CSRF-Token", await getCsrf());
      return send(path, { ...init, headers });
    }
    let response = await attempt();
    if (response.status === 401 && authenticated) {
      const renewed = await refresh();
      if (!renewed.ok) return renewed;
      response = await attempt();
    }
    if (response.status === 403 && errorCode(await response.clone().json().catch(() => null)) === "CSRF_INVALID") {
      csrf = null;
      response = await attempt();
    }
    if (response.ok && ["/auth/login", "/auth/mfa/verify", "/auth/logout", "/auth/password/reset"].includes(path)) csrf = null;
    return response;
  }
  return { request, clearCsrf: () => { csrf = null; } };
}

export const api = createApiClient(API_BASE_URL);

export function errorMessage(payload: unknown, fallback: string): string {
  return isRecord(payload) && isRecord(payload.error) && typeof payload.error.message === "string" && payload.error.message.trim()
    ? payload.error.message : fallback;
}

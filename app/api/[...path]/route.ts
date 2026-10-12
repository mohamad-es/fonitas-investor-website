import { proxyApi } from "@/lib/server/api-proxy";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
async function handle(request: Request, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  return proxyApi(request, path, {
    upstream: process.env.BACKEND_UPSTREAM ?? "",
    backendHost: process.env.BACKEND_HOST ?? "",
    publicHost: process.env.PUBLIC_HOST ?? "developers.fonitas.com",
    development: process.env.NODE_ENV === "development",
  });
}
export { handle as GET, handle as POST, handle as PUT, handle as PATCH, handle as DELETE };

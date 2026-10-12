# Deployment and Vite migration

[CI](../.github/workflows/ci.yml), [Dockerfile](../Dockerfile), [Compose example](../compose.production.example.yml) and VERSION own executable release values. Main already performs quality, immutable GHCR publication and production deploy; the old README's statement that deploy was disabled was stale.

The operational app/image identity remains **fonitas-developer-dashboard**, the host **developers.fonitas.com**, and the server helper call remains `/usr/local/sbin/deploy-app <APP_NAME> <immutable-tag>`. The repository name is **gemvc/fonitas-developer-website**. Do not rename helper registrations, server paths, secrets or images through this frontend migration. Internal HTTP remains port 80 to preserve the existing Traefik service contract. The container runs a nonroot standalone Next server with /health instead of serving Vite files through Nginx.

## Quality and packaging

PR/main quality runs clean lockfile install, production audit, document/lint/logic/type/build checks, standalone browser tests and a Docker startup/health smoke test on container port 80. Image publication and deployment depend on quality. Browser/health checks are not live Identity acceptance. The image copies standalone output, static files and packaged public assets; it never bakes server environment credentials into the browser.

The runtime configuration remains BACKEND_UPSTREAM, BACKEND_HOST and PUBLIC_HOST, passed by Compose. Next reads them per server request and implements the former Nginx /api proxy with the reviewed Symfony /api/v1 prefix. No browser VITE/NEXT_PUBLIC upstream variable remains. The old Nginx template, Vite entry/config and TypeScript project references are retired. Backend auth cookies stay host-only, so users sign in on this domain with their existing Fonitas account. Inspect CORS/origin support for developers.fonitas.com and backend-supported email destinations rather than changing shared Identity configuration blindly.

## Coordinated rollout

1. Review and merge this portal PR only after checks and explicit authorization. Main uses the normal helper; no manual image tag/SSH deploy is part of ordinary development.
2. Confirm the production run and /health, home, login and developer-registration routes on developers.fonitas.com. Verify real sign-in, CSRF/profile saves, resume, read-only membership and denied unrelated organization access with supported accounts. Never claim live acceptance from mock tests.
3. Deploy the paired shop handoff PR after this portal is available. It points navbar/footer/account developer links here and redirects old /product-owners and /developer/onboarding paths, preserving only a validated organization UUID. The shop keeps buyer Identity and commerce; it no longer carries the developer wizard.

After a push/merge, give the user the PR/Checks or production-run link and ask them to report the result. Do not poll/wait for CI. For server work, issue one command, inspect its actual output, then continue. No merge/deployment is inferred from a passing local build. Rollback uses the existing helper and the previously verified immutable image/config contract; do not change global backend sessions or email destinations as a frontend rollback.

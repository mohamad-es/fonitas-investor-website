# Backend integration authority

This website is primarily public, educational and content-driven. The reviewed Symfony backend remains the authority for any developer workflow facts that this website describes or links to, while the separate Developer Dashboard owns authenticated operational work.

Reviewed Symfony backend: `5dfb01379fe75dcffc8340e4c2b44ec633e8bebf`. Its OpenAPI and domain sources own field schemas, permissions and workflow state. This document records only the boundaries that matter when writing website content or integrating a future website feature.

## Workflow facts the website may explain

- **Identity:** Fonitas accounts support registration, login/MFA, CSRF, session restore/refresh/logout, verification/resend and password recovery. Authentication operations belong to the separate Developer Dashboard/product, not to documentation pages.
- **Organization:** the backend Organization represents the person/company/team that owns developer applications. Organization membership and onboarding are operational Dashboard concerns.
- **Application:** developers can prepare, submit and resubmit organization-owned applications; review, requested changes, rejection and acceptance are backend/Dashboard workflow states. Developers cannot approve themselves.
- **Publishing:** supported contracts, approved versions, QA, artifacts and checklist gates precede authorized publication. Publishing state is distinct from application state.
- **Gallery:** explicit opt-in requires an existing published store listing. Profile completion or acceptance alone does not automatically market an application.

These facts may be explained as a lifecycle or rule on the website, but the website must not present them as actions available inside this project.

## Product links and terminology

When a page tells a developer to perform an operational action, link to the separate Developer Dashboard rather than creating a local form or state machine. The link target and authentication handoff must be based on an explicitly agreed product contract; do not promise automatic cross-subdomain session transfer unless the backend/product contract supports it.

Use **developer** or **application owner** for the audience. Use **Organization** when describing the backend ownership model. Do not call website readers "publishers" merely because Fonitas is the publisher.

## Security and transport boundary

The current backend cookie factory issues access, refresh and CSRF cookies with the backend's established security properties. Any future server-backed website feature must preserve the existing backend authorization and CSRF model; proxying is transport, not authorization.

Public documentation should not require personal form data, account tokens or credentials. Do not log or persist such data. Prefer static/server-rendered content for normal pages.

If an authenticated integration is introduced later, reuse the reviewed same-origin `/api` relay rather than exposing the backend hostname or credentials to browser code. The backend remains authoritative for session, membership and permissions.

## Email and authentication boundaries

Existing verification/reset destinations remain backend-owned. Do not change shared email destinations or invent SSO/session transfer between the shop, Developer Website and separate Dashboard without an explicit cross-product contract.

API/browser tests are synthetic and do not prove live credentials, email delivery, CORS or cross-organization enforcement. Website content must not imply that such live verification has been performed when it has not.

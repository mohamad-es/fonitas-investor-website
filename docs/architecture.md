# Developer website architecture

This repository is the public Fonitas Developer Website / Developer Hub. It is a content-first Next.js App Router site at `developers.fonitas.com` that explains how Fonitas works, developer requirements, application rules, publishing guidance and FAQs. The authenticated Developer Dashboard is a separate project.

## Source owners

| Source | Responsibility |
| --- | --- |
| [Root layout](../app/layout.tsx), [portal shell](../components/portal/shell.tsx) | Shared Fonitas visual identity, public documentation navigation, locale/direction and external Fonitas links |
| [Global styles](../app/globals.css), [portal styles](../app/portal.css), public assets | Approved light surfaces, fonts, logo, green actions, responsive and RTL layouts |
| [Home](../app/page.tsx), [hub content](../lib/developer-hub-content.ts) | Developer Hub landing content and localized documentation source |
| [Hub page](../components/portal/hub-page.tsx) | Shared documentation layout, sidebar and section presentation |
| `app/how-it-works`, `app/requirements`, `app/guidelines`, `app/faq` | Public documentation routes; these pages contain no dashboard state or application mutations |
| [Locale loader](../i18n/request.ts), existing messages | English/Persian/Arabic locale selection and existing Identity UI parity |

The site may reuse approved Fonitas visual assets, but it must not import the shop catalog, checkout, buyer library, payment/recovery flows or Developer Dashboard implementation. Keep the website independently deployable and content-oriented.

## Information architecture

- `/`: Developer Hub overview and entry points.
- `/how-it-works`: end-to-end explanation from developer setup through review, QA, publication and Gallery boundaries.
- `/requirements`: developer, application and technical readiness checklist.
- `/guidelines`: application and publishing principles/rules.
- `/faq`: common developer questions and scope clarification.
- The separate Developer Dashboard owns authenticated application management, submissions, review state, organization management and other operational workflows. Do not recreate those flows here.

## Content authority and boundaries

Public copy must explain backend-owned behavior without pretending the website controls it. Fonitas remains the publisher and owns acceptance. Completing developer information does not itself approve an application, grant a publisher role, establish payout eligibility or create Gallery visibility. Application, QA, contract, publication and Gallery state remain authoritative in the Dashboard/backend.

When a rule or field is not confirmed by the current backend/Dashboard contract, do not invent it. Content should use explicit qualifiers such as "current contract" or "required by the Dashboard" where the exact field-level policy can change.

## Localization and accessibility

The site supports English, Persian and Arabic through the existing cookie-based locale selection. New Developer Hub content is stored in `lib/developer-hub-content.ts` with parity across all three locales. Layouts must remain readable in RTL, responsive on mobile, keyboard accessible and use visible focus states.

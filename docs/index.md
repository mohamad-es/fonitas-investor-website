# Documentation ownership

This repository owns the **Fonitas Developer Website** at `developers.fonitas.com`. The website explains how Fonitas works for developers/application owners, documents requirements and rules, and provides onboarding guidance. It is not the authenticated Developer Dashboard; operational dashboard functionality belongs to a separate project.

| Owner | Facts |
| --- | --- |
| [Architecture](architecture.md) | Website information architecture, routes, content modules, shared UI provenance and configuration |
| [Backend contract](backend-contract.md) | Backend facts that the website may describe or link to; authoritative workflow boundaries |
| [Development](development.md) | Setup, verification commands and test scope |
| [Deployment](deployment.md) | Workflow, immutable image, runtime configuration and release order |
| [Roadmap](roadmap.md) | Unfinished website/content work only |
| [Achievements](achievements.md) | Dated completed work and actual evidence |

[AGENTS.md](../AGENTS.md) is the entry point. Code/configuration owns executable values; docs explain the product and implementation boundaries. Update the affected owner in every code commit, remove completed tasks from the roadmap, and record evidence in achievements.

## Product boundary

### This website owns

- Fonitas and marketplace/publisher education for developers.
- How the developer journey works, from preparation through submission and publication.
- Developer requirements and eligibility guidance.
- Application, technical, content and publishing guidelines.
- Rules, policies and practical checklists.
- FAQs, terminology and explanatory documentation.
- Clear links into the separate Developer Dashboard when an authenticated action is required.

### This website does not own

- Developer account/session management as a product surface.
- Application creation/editing/submission.
- Review-state management or responding to staff changes.
- Contract, QA or publication controls.
- Gallery offer management.
- Buyer/shop catalog, checkout, payment or recovery behavior.
- Fonitas staff acceptance controls.

Do not copy these facts into shop documentation: the shop owns buyer/shop behavior, while this website owns developer-facing education and guidance.

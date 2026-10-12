# Historical evidence

## 2026-10-11 — Fonitas brand theme alignment

Aligned the global DaisyUI theme with the Fonitas light design tokens: primary green `#27B681`, supporting green `#159A6A`, warm off-white `#F7F8F7`, white surfaces, charcoal text, subtle borders and softer rounded controls. Preserved the existing font assets, visible focus states and RTL behavior.

Refined the public Developer Hub landing page typography and use of shared theme colors, reduced unnecessary CTA shadows, and made “How it works” navigate to the actual public guide instead of leaving it as an inert button. The three localized content variants and existing step illustrations remain intact.

Changes are on a feature branch and have not been merged or deployed. Verification is still required before release.

## 2026-10-08 — Public site scope cleanup

The public Developer Website was reduced to the intended documentation surface: Home, Guide, Publishing rules and FAQ. The requirements route and inherited dashboard/authentication/onboarding routes were removed from the public site. Blog remains intentionally reserved for a later page-by-page implementation step.

The landing page navigation and shared documentation navigation were updated to stop exposing retired routes. No new UI was introduced for the remaining inner pages; the current step focuses on route and information-architecture cleanup before page-by-page design work.

No merge or deployment is implied by this entry; verification remains a release step.

## 2026-10-07 — Developer Hub scope and first content surface

The repository scope was corrected from a dashboard-oriented developer portal to the public Fonitas Developer Website / Developer Hub. The separate Developer Dashboard remains outside this project.

The first public information architecture now includes a Developer Hub home plus dedicated How it works, Requirements, Guidelines and FAQ pages. The pages explain the developer/publisher relationship, review and publication boundaries, technical readiness, publishing principles and common questions without implementing authenticated application management.

Developer Hub content is localized in English, Persian and Arabic, with the existing Fonitas light visual system, responsive layouts and RTL support. A shared documentation component keeps the page structure consistent and makes future rules/guides easier to add.

The documentation architecture, roadmap and development guidance were updated together with the UI so the repository's canonical docs describe the same product boundary as the code. No merge or deployment is implied by this entry; verification remains a release step.


## 2026-10-10 — Landing-page wizard refresh

Replaced the compact journey visual on the public Developer Hub home page with a five-step interactive guide: account setup, product introduction, service selection, additional information, and preview/confirmation. The wizard clearly identifies itself as a demo and does not upload files, create applications, or submit operational data.

The content supports English, Persian and Arabic. The guide includes selectable product examples, multi-select service cards with a live progress indicator, step navigation, responsive layouts and RTL support. Formal review, contract, QA, publication and Gallery status remain explanatory concepts rather than operational actions on this website.

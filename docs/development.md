# Development and verification

Dependency versions and scripts are owned by [package.json](../package.json) and [lockfile](../package-lock.json). This repository is a public content-first Developer Hub. It should not require authenticated developer data to render its documentation pages.

```bash
npm ci
npm run lint
npm test
npm audit --omit=dev --audit-level=high
node scripts/check-docs.mjs
npm run build
```

Build first for browser checks. CI installs temporary browser tooling without changing the lockfile, then:

```bash
npx playwright test --config=playwright.config.mjs
```

Documentation verification should cover the public home, all Developer Hub routes, locale switching, RTL layout and responsive navigation. Tests must not create real developer accounts or applications.

| Area | Verification |
| --- | --- |
| Developer Hub | Home, How it works, Requirements, Guidelines and FAQ render successfully. |
| Content | No dashboard-only controls, fake application state or invented approval/publication state appears on public pages. |
| Localization | English, Persian and Arabic content records remain complete and readable; RTL navigation and sections remain usable. |
| Accessibility | Keyboard focus, skip link, semantic headings, links and readable contrast remain intact. |
| Responsive UI | Header, documentation sidebar/cards and long-form content work on mobile and desktop widths. |

Production audit blocks High/Critical production advisories. Full audit still needs review for the inherited development dependency chain. Do not use forced framework downgrades or disable lint rules to clear it. Audit results are dated database evidence, not a full security certification.

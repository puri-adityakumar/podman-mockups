# Podman LFX mockup gallery

Design-only HTML mockups derived from the completed Podman website audit. These screens are **proposed designs and are not implemented in `podman.io`**.

## Screen inventory

| Scope | File | Concept | Status |
| --- | --- | --- | --- |
| Core | [`downloads.html`](./downloads.html) | Dedicated CLI/Desktop downloads page with OS recommendation and complete option matrix | Proposed design |
| Core | [`meeting-permalink.html`](./meeting-permalink.html) | Shareable meeting page with recording, chapters, notes, and resources | Proposed design |
| Core | [`blog-presentation.html`](./blog-presentation.html) | Higher-contrast, readable blog article presentation | Proposed design |
| Core | [`backlog-fixes.html`](./backlog-fixes.html) | Responsive community/meeting cards and accessible demo presentation | Proposed design |
| Bonus | [`youtube-community.html`](./youtube-community.html) | Community video hub tied to meeting recordings | Proposed design |
| Bonus | [`unified-docs.html`](./unified-docs.html) | Unified documentation discovery and task-based navigation | Proposed design |
| Bonus | [`contributor-runbook.html`](./contributor-runbook.html) | Guided website-update and validation flow for contributors | Proposed design |

Open [`index.html`](./index.html) to launch the gallery.

See [`VALIDATION.md`](./VALIDATION.md) for the static, desktop, mobile, navigation, and browser QA record.

## Visual sources

- Current local Podman layout and navigation from `podman.io/docusaurus.config.js`, `src/css/main.css`, and the shared layout/UI components under `src/components/`.
- Current mascot wordmark asset from `podman.io/static/logos/optimized/podman-3-logo-266w-253h.webp`, plus the site’s wave and community-call assets where a native framed state benefits from them.
- The same typography roles as the current frontend: Montserrat headings, Source Sans Pro body copy, and Source Code Pro code.
- Exact local Tailwind palette tokens: blue `#1ECCFF`, purple `#892CA0`, and the project’s gray scale.
- Native visual behaviors reproduced in static HTML: blue-to-purple navigation, white wave transition, purple primary buttons, lightly rounded cards, restrained native shadows, and the purple multi-column footer.

The gallery intentionally stays in light mode and labels every screen as proposed/not implemented. The mockups are visually aligned references, not copied production pages.

## Boundaries

- No production code was changed.
- Buttons and form controls illustrate UI states; they do not download, submit, publish, or modify data.
- Versions, dates, and content are prototype labels unless they restate audit evidence.
- Use these files as design/video references, not as proof that a feature exists.

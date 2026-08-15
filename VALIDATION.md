# Podman mockup gallery validation

Validated 2026-08-08 using the local server and Codex in-app browser.

Visual reference: clean local `podman.io` source at `72d8a97040b3969199ea0d3f3f7543f740d49638`, including `docusaurus.config.js`, `tailwind.config.js`, `src/css/main.css`, shared layout/UI components, and current static assets.

| Check | Result |
| --- | --- |
| Inventory | PASS — one launcher plus seven separate mockups: four LFX core and three LFX bonus concepts. |
| Static structure | PASS — `node validate.mjs` validates eight screens, one H1/main per screen, unique IDs, alt text, local targets, and explicit proposed/not-implemented boundaries. |
| Local references | PASS — all HTML, CSS, three local font families, mascot, favicon, wave, community-call, article-image, gallery, and hash references resolve. |
| Podman visual system | PASS — current blue→purple navigation, mascot + `podman` wordmark, Montserrat headings, Source Sans Pro body, Source Code Pro code, native purple buttons, lightly rounded cards/shadows, wave transition, and purple three-column footer are present. |
| Desktop (1280 × 720) | PASS — launcher plus all seven mockups have zero document-level horizontal overflow and zero broken images. |
| Phone (375 × 812) | PASS — launcher plus all seven mockups have zero document-level horizontal overflow and zero broken images; controls are at least 44 px high, primary navigation collapses, and the footer becomes one column. |
| Gallery | PASS — seven accessible visual previews, four core/three bonus labels, complete launcher links, native Podman preview styling, and no overflow at desktop or phone width. |
| Navigation | PASS — audit → gallery → Video prep and gallery → individual mockup → gallery paths were exercised successfully. |
| Browser diagnostics | PASS — desktop and phone passes produced no console errors. |
| Production boundary | PASS — local `podman.io` remained clean; only design artifacts under `LFX-AUDIT/podman/mockups/` changed. |

No `podman.io` production source, public content, or video was created or changed.

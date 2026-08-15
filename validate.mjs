import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const expected = [
  'index.html',
  'downloads.html',
  'meeting-permalink.html',
  'blog-presentation.html',
  'backlog-fixes.html',
  'youtube-community.html',
  'unified-docs.html',
  'contributor-runbook.html',
];
const failures = [];
const results = [];

for (const file of expected) {
  const absolute = path.join(root, file);
  if (!fs.existsSync(absolute)) {
    failures.push(`${file}: missing expected screen`);
    continue;
  }

  const html = fs.readFileSync(absolute, 'utf8');
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
  const refs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((match) => match[1]);
  const localFailures = [];

  for (const ref of refs) {
    if (/^(https?:|data:|mailto:)/.test(ref)) continue;
    if (ref.startsWith('#')) {
      if (!ids.includes(ref.slice(1))) localFailures.push(`missing hash target ${ref}`);
      continue;
    }
    const relativePath = decodeURIComponent(ref.split('#')[0].split('?')[0]);
    if (!fs.existsSync(path.resolve(root, relativePath))) localFailures.push(`missing file ${ref}`);
  }

  const images = [...html.matchAll(/<img\b[^>]*>/g)].map((match) => match[0]);
  const imagesWithoutAlt = images.filter((tag) => !/\salt="[^"]*"/.test(tag));
  const targetBlankWithoutRel = [...html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)]
    .map((match) => match[0])
    .filter((tag) => !/\srel="[^"]*noopener[^"]*"/.test(tag));

  if (duplicateIds.length) failures.push(`${file}: duplicate IDs ${duplicateIds.join(', ')}`);
  if (localFailures.length) failures.push(`${file}: ${localFailures.join('; ')}`);
  if (imagesWithoutAlt.length) failures.push(`${file}: ${imagesWithoutAlt.length} image(s) without alt`);
  if (targetBlankWithoutRel.length) failures.push(`${file}: target=_blank link missing noopener`);
  if (!/<main\b/.test(html)) failures.push(`${file}: missing main landmark`);
  if ((html.match(/<h1\b/g) || []).length !== 1) failures.push(`${file}: expected exactly one H1`);
  if (!/Not implemented/i.test(html)) failures.push(`${file}: missing not-implemented label`);
  // The launcher list is deliberately chrome-free; mockup screens keep Podman framing.
  if (file !== 'index.html') {
    if (!/class="proposal-bar"/.test(html)) failures.push(`${file}: missing proposed-design boundary`);
    if (!/class="podman-nav"/.test(html)) failures.push(`${file}: missing Podman-style navigation`);
    if (!/podman-3-logo-266w-253h\.webp/.test(html)) failures.push(`${file}: missing current Podman mascot asset`);
    if (!/class="site-footer"/.test(html)) failures.push(`${file}: missing Podman-style footer`);
  }

  results.push({
    file,
    ids: ids.length,
    localReferences: refs.filter((ref) => !/^(https?:|data:|mailto:)/.test(ref)).length,
    images: images.length,
  });
}

const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const requiredVisualTokens = [
  'font-family: "Montserrat"',
  'font-family: "Source Sans Pro"',
  'font-family: "Source Code Pro"',
  '#1eccff',
  '#892ca0',
  'linear-gradient(to right, var(--podman-blue-bright), var(--podman-purple))',
  'podman-3-logo-266w-253h.webp',
];
for (const required of requiredVisualTokens) {
  if (!css.includes(required) && !expected.some((file) => fs.readFileSync(path.join(root, file), 'utf8').includes(required))) {
    failures.push(`visual system: missing ${required}`);
  }
}
for (const match of css.matchAll(/url\(["']?([^"')]+)["']?\)/g)) {
  if (!fs.existsSync(path.resolve(root, match[1]))) failures.push(`styles.css: missing asset ${match[1]}`);
}

console.log(JSON.stringify({ screens: results.length, results, failures }, null, 2));
if (failures.length) process.exit(1);

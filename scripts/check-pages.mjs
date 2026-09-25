import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../docs/', import.meta.url));
const base = '/workshop-agentforce-vibes';
const html = readFileSync(path.join(root, 'index.html'), 'utf8');
assert.match(
  html,
  /<html[^>]+lang="pt-BR"/,
  'Document language must be Portuguese.',
);
assert.match(
  html,
  /Agentforce Vibes — Workshop em 13 etapas/,
  'Page title is missing.',
);
assert.ok(existsSync(path.join(root, '.nojekyll')), 'Missing .nojekyll.');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
assert.equal(new Set(ids).size, ids.length, 'Duplicate HTML IDs.');
for (let n = 1; n <= 13; n++)
  assert.ok(ids.includes(`etapa-${n}`), `Missing step ${n}.`);

function checkRef(ref, from) {
  if (/^(?:https?:|mailto:|data:|javascript:|\/\/)/.test(ref)) return;
  if (ref.startsWith('#')) {
    assert.ok(ids.includes(ref.slice(1)), `Missing anchor ${ref}.`);
    return;
  }
  const clean = decodeURIComponent(ref.split(/[?#]/)[0]);
  if (!clean) return;
  let target;
  if (clean.startsWith('/')) {
    assert.ok(
      clean.startsWith(base + '/'),
      `Asset lacks GitHub project prefix: ${ref}`,
    );
    target = path.join(root, clean.slice(base.length));
  } else {
    target = path.resolve(path.dirname(from), clean);
  }
  assert.ok(target.startsWith(root), `Asset escaped output directory: ${ref}`);
  assert.ok(existsSync(target), `Missing local asset: ${ref}`);
}

for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g))
  checkRef(match[1], path.join(root, 'index.html'));
function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? walk(path.join(dir, entry.name))
      : [path.join(dir, entry.name)],
  );
}
const files = walk(root);
for (const file of files) {
  assert.ok(
    !/\.(?:map|pem|key)$/.test(file),
    `Unexpected private/debug file: ${file}`,
  );
  if (file.endsWith('.js')) {
    const text = readFileSync(file, 'utf8');
    for (const match of text.matchAll(
      /(?:from\s*|import\s*\(\s*|import\s*)["'](\.{1,2}\/[^"']+)["']/g,
    ))
      checkRef(match[1], file);
  }
  if (file.endsWith('.css')) {
    for (const match of readFileSync(file, 'utf8').matchAll(
      /url\(\s*["']?([^"')\s]+)["']?\s*\)/g,
    ))
      checkRef(match[1], file);
  }
}
const prompts = readFileSync(path.join(root, 'prompts-do-workshop.md'), 'utf8');
assert.equal(
  [...prompts.matchAll(/^## \d+\./gm)].length,
  13,
  'Download must contain 13 prompts.',
);
for (const name of ['matriz-de-validacao.md', 'guia-do-facilitador.md'])
  assert.ok(existsSync(path.join(root, name)), `Missing download: ${name}`);
console.log(
  `Static package verified: 13 steps, valid anchors, 3 handouts, ${files.length} public files and local asset references.`,
);

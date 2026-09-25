import { access, cp, mkdir, readdir, rm, writeFile } from 'node:fs/promises';

// Copy only public static output. Never publish the server bundle or workspace.
const root = new URL('../', import.meta.url);
const source = new URL('dist/client/', root);
const destination = new URL('docs/', root);
await access(new URL('index.html', source));
await mkdir(destination, { recursive: true });
for (const name of await readdir(destination)) {
  await rm(new URL(name, destination), { recursive: true, force: true });
}
await cp(source, destination, { recursive: true });
// vinext writes the assetPrefix as a physical directory. GitHub already
// mounts docs/ at that prefix, so flatten it once to avoid a doubled path.
const assetDirectory = new URL('workshop-agentforce-vibes/', destination);
await cp(assetDirectory, destination, { recursive: true });
await rm(assetDirectory, { recursive: true });
await writeFile(new URL('.nojekyll', destination), '');
console.log('GitHub Pages output is ready in docs/.');

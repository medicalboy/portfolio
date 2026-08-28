// Bakes the profile data into a static JSON file the client can fetch directly.
// This is what lets the site run on S3 + CloudFront with no server behind it.
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { profile } from '../server/data/profile.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'client', 'public', 'api');
const outFile = path.join(outDir, 'profile.json');

await mkdir(outDir, { recursive: true });
await writeFile(outFile, `${JSON.stringify(profile, null, 2)}\n`, 'utf8');

console.log(`Wrote ${path.relative(root, outFile)}`);

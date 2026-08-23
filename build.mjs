#!/usr/bin/env node

import { readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const DOCS = resolve(ROOT, 'docs');

async function main() {
  const resume = JSON.parse(await readFile(resolve(DOCS, 'resume.json'), 'utf-8'));
  const theme = await import(resolve(ROOT, 'theme/index.js'));
  const html = theme.render(resume);
  await writeFile(resolve(DOCS, 'index.html'), html, 'utf-8');
  console.log('Rendered public/index.html');
}

main().catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});

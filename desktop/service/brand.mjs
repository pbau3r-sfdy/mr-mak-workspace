// Product name and voice persona from brand/brand.json (see brand/README.md).
// Packaged runtime: desktop/prepare.mjs copies the file next to this module.
// Development: it is read from brand/ at the repository root.
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const file = [path.join(here, 'brand.json'), path.join(here, '..', '..', 'brand', 'brand.json')].find(existsSync);
if (!file) throw new Error('brand/brand.json is missing');

export const brand = JSON.parse(readFileSync(file, 'utf8'));
export const productName = brand.name;

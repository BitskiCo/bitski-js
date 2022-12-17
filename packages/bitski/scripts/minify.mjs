import { minify } from 'terser';
import { promises as fs } from 'fs';

const src = await fs.readFile('./dist/bundled/bitski.bundle.js', 'utf8');

const min = await minify(src);

await fs.writeFile('./dist/bundled/bitski.min.js', min.code, 'utf8');

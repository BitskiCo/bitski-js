import { promises as fs } from 'fs';
import replaceInFiles from 'replace-in-files';

await fs.copyFile('../../README.md', './README.md');

await replaceInFiles({
  files: ['./README.md'],
  from: /\(\/docs\/images/g,
  to: `(https://raw.githubusercontent.com/BitskiCo/bitski-js/main/docs/images`,
});

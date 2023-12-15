import replaceInFiles from 'replace-in-files';
import packageJson from '../package.json' assert { type: 'json' };
import fs from 'fs';

await replaceInFiles({
  files: ['./lib/**/*', './dist/**/*', './callback.html'],
  from: 'BITSKI_SDK_VERSION',
  to: `${packageJson.version}`,
});

const htmlFilePath = './callback.html';
let htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
htmlContent = htmlContent.replace(/v[0-9]+\.[0-9]+\.[0-9]+/, 'v' + packageJson.version);
fs.writeFileSync(htmlFilePath, htmlContent);

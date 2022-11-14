import replaceInFiles from 'replace-in-files';
import packageJson from '../package.json' assert { type: 'json' };

await replaceInFiles({
  files: ['./lib/**/*', './dist/**/*'],
  from: 'BITSKI_SDK_VERSION',
  to: `"bitski-sdk-v${packageJson.version}"`,
});

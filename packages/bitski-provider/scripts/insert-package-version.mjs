import replaceInFiles from 'replace-in-files';
import packageJson from '../package.json' assert { type: 'json' };

await replaceInFiles({
  files: ['./lib/**/*', './dist/**/*'],
  from: 'BITSKI_PROVIDER_VERSION',
  to: `"bitski-provider-v${packageJson.version}"`,
});

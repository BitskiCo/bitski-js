import { nodeResolve } from '@rollup/plugin-node-resolve';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import nodeGlobals from 'rollup-plugin-node-globals';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'dist/esm/-private/sdk.js',
  output: {
    file: 'dist/bundled/bitski.bundle.js',
    format: 'umd',
    name: 'Bitski',
  },
  plugins: [
    commonjs(),
    nodeResolve(),
    nodePolyfills(),
    nodeGlobals({
      process: false,
      buffer: false,
      dirname: false,
      filename: false,
      baseDir: false,
    }),
  ],
};

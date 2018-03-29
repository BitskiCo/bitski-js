import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import image from 'rollup-plugin-img';
import pkg from './package.json';

const globals = { 'oidc-client': 'Oidc', 'web3-providers-http': 'HttpProvider', 'web3': 'Web3' };

export default {
  external: Object.keys(pkg.dependencies),
  input: 'src/bitski.ts',
  output: [
    { file: pkg.main, name: pkg.name, format: 'umd', sourcemap: true, globals },
    { file: pkg.module, format: 'es', sourcemap: true, globals },
  ],
  plugins: [
    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir: true, tsconfigOverride: { compilerOptions: { target: 'es5' } } }),

    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),

    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),

    // Resolve source maps to the original source
    sourceMaps(),

    // Include images
    image()
  ],
  watch: {
    include: 'src/**',
  },
};

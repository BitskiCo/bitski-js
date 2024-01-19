import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'BitskiWidget',
      formats: ['es', 'umd'],
      fileName: (format) => `lib.${format}.js`,
    },
    commonjsOptions: {
      include: [/eth-provider-types/, /node_modules/],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },

    sourcemap: true,
    emptyOutDir: true,
  },
  optimizeDeps: {
    include: ['eth-provider-types'],
  },
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
});

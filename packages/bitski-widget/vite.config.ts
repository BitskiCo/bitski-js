import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import dts from 'vite-plugin-dts';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
  build: {
    copyPublicDir: false,
    commonjsOptions: {
      include: [/eth-provider-types/, /node_modules/],
    },
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, 'src/lib/index.ts'),
      name: 'BitskiWidget',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'react-dom', 'tailwindcss'],
      output: {
        globals: {
          react: 'React',
          'react/jsx-runtime': 'react/jsx-runtime',
          'react-dom': 'ReactDOM',
          tailwindcss: 'tailwindcss',
        },
      },
    },
    sourcemap: true,
  },
  optimizeDeps: {
    include: ['eth-provider-types'],
  },
  plugins: [react(), dts({ include: 'src/lib', rollupTypes: true })],
});

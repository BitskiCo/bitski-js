import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'BitskiWidget',
      fileName: (format) => `index.${format}.js`,
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
  plugins: [react()],
});

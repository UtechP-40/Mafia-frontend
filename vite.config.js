// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window', // Polyfill the `global` variable as `window`
  },
  resolve: {
    alias: {
      // If needed, you can add additional polyfills for Node.js modules here.
      // For example, if you have issues with `process`, `Buffer`, or others.
      process: 'process/browser',
    },
  },
});


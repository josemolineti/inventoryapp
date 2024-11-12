import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Defina a pasta 'src' como raiz para o alias '@'
    },
  },
});

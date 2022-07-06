/// <reference types="vitest" />

import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';

const _dirname = new URL('./src', import.meta.url).pathname;

export default defineConfig({
  plugins: [
    Vue()
  ],
  test: {
    globals: true,
    environment: 'jsdom'
  },
  resolve: {
    alias: {
      '@': _dirname
    }
  }
});

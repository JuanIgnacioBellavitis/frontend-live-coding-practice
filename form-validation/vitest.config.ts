import { defineConfig } from 'vitest/config'

// English: Only test options here — Vitest merges with vite.config.ts (React plugin lives there).
//          Avoids Vite 8 vs Vitest-bundled Vite plugin type mismatch on `plugins`.
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
})

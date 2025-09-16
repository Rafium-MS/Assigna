import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@testing-library/react': fileURLToPath(
        new URL('./test-utils/testing-library-react.tsx', import.meta.url),
      ),
    },
  },
  test: {
    environment: 'jsdom',
  },
});

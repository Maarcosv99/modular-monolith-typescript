import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths({
    ignoreConfigErrors: true,
    loose: true,
  })],
  test: {
    globals: true,
    include: ['tests/**/*.spec.ts'],
    environment: 'node',
  },
});
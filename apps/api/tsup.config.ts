// Need create a script to build all modules and then build the api.

import { defineConfig } from 'tsup';

import path from 'path';

export default defineConfig({
  entry: ['src/main.ts'],
  outDir: 'dist',
  format: ['esm'],
  platform: 'node',
  esbuildOptions: (options) => {
    options.alias = {
      '@modules/identity/config': path.resolve(__dirname, '../../modules/identity/src/config.ts'),
      '@modules/shared/infrastructure/rest/express/express.service': path.resolve(__dirname, '../../modules/shared/src/infrastructure/rest/express/express.service.ts'),
    }
  },
});
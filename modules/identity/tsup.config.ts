import { defineConfig } from 'tsup';
import type { Plugin } from 'esbuild';

import { aliasPath } from 'esbuild-plugin-alias-path';
import path from 'path';


export const sharedAliasPlugin = (): Plugin => ({
  name: 'alias-shared-modules',
  setup(build) {
    build.onResolve({ filter: /^@modules\/shared\/(.+)$/ }, args => {
      console.log('args', args.path);
      const relativePath = args.path.replace(/^@modules\/shared\//, '');
      const resolvedPath = path.resolve(__dirname, '../shared/src', relativePath);
      return { path: resolvedPath };
    });
  },
});


export default defineConfig({
  entry: ['src/bootstrap.ts'],
  outDir: 'dist',
  format: ['esm'],
  platform: 'node',
  target: 'es2015',
  bundle: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  external: ['reflect-metadata', 'tsyringe'],
  tsconfig: 'tsconfig.json',
  onSuccess: 'node dist/bootstrap.js',
});
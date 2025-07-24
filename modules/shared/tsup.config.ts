import { defineConfig } from 'tsup';
import { getFilesSync } from 'files-folder';

export default defineConfig({
  entry: getFilesSync('src', { full_path: true }),
  outDir: 'dist',
  format: ['esm'],
  platform: 'node',
  target: 'es2015',
  bundle: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  dts: true,
  shims: true,
  external: ['reflect-metadata', 'tsyringe'],
  tsconfig: 'tsconfig.json',
});
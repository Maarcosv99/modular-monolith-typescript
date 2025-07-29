import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/infrastructure/database/drizzle-database/schemas.ts',
  dialect: 'postgresql',
  driver: 'pglite',
  dbCredentials: {
    url: './pglite/'
  }
});
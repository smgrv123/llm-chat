import { defineConfig } from 'drizzle-kit';

import './envConfig';

export default defineConfig({
  schema: './server/db/schema.ts',
  out: './server/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DB_CONNECTION_URL as string,
  },
});

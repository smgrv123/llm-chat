import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

import '../../envConfig';

const migrationClient = postgres(process.env.DB_CONNECTION_URL as string, { max: 1 });

async function main() {
  await migrate(drizzle(migrationClient), {
    migrationsFolder: './server/db/migrations',
  });

  await migrationClient.end();
}

main();

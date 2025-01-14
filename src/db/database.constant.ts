import type { Database } from '@/db/database.types';
import { Kysely, PostgresDialect } from 'kysely';
import pg from 'pg';

export const db = new Kysely<Database>({
  log: ['error'],
  dialect: new PostgresDialect({
    pool: new pg.Pool({
      connectionString: process.env.POSTGRES_URL,
      max: 10,
    }),
  }),
});

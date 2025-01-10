import type { Database } from '@/db/database.types';
import { Kysely, PostgresDialect } from 'kysely';
import pg from 'pg';
import { createKysely } from '@vercel/postgres-kysely';

export const db = !!process.env.VERCEL_ENV
  ? createKysely<Database>()
  : new Kysely<Database>({
      log: ['query', 'error'],
      dialect: new PostgresDialect({
        pool: new pg.Pool({
          connectionString: process.env.POSTGRES_URL,
          max: 10,
        }),
      }),
    });

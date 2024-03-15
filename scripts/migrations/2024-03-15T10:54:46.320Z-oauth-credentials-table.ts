import type { Kysely } from 'kysely';
import type { Database } from '@/db/database.types';
import { sql } from 'kysely';

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createTable('oauthCredentials')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn('tokenId', 'varchar', (col) => col.notNull())
    .addColumn('userId', 'varchar', (col) => col.notNull())
    .addColumn('accessToken', 'varchar', (col) => col.notNull())
    .addColumn('expire', 'date', (col) => col.notNull())
    .execute();

  await db.schema
    .createIndex('oauthCredentials_user_id_index')
    .on('oauthCredentials')
    .column('userId')
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.dropIndex('oauthCredentials_user_id_index').on('oauthCredentials').execute();

  await db.schema.dropTable('oauthCredentials').execute();
}

import { Kysely } from 'kysely';
import { Database } from '@/db/database.types';

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createIndex('transaction_owner_id_index')
    .on('transactions')
    .column('userId')
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.dropIndex('transaction_owner_id_index').on('transactions').execute();
}

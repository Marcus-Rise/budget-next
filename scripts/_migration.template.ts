import { Kysely } from 'kysely';
import { Database } from '@/db/database.types';

export async function up(db: Kysely<Database>): Promise<void> {
  // on migration startup
}

export async function down(db: Kysely<Database>): Promise<void> {
  // on migration rollback
}

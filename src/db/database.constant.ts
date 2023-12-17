import { createKysely } from '@vercel/postgres-kysely';
import { Database } from '@/db/database.types';

export const db = createKysely<Database>();

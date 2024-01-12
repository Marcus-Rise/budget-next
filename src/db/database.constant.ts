import { createKysely } from '@vercel/postgres-kysely';
import type { Database } from '@/db/database.types';

export const db = createKysely<Database>();

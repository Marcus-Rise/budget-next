import 'server-only';
import type { Generated } from 'kysely';

interface TransactionTable {
  id: Generated<string>;
  title: string;
  amount: number;
  category: string;
  date: Date;
  userId: string;
}

export type { TransactionTable };

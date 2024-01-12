import type { TransactionTable } from '@/transaction/transaction.table';

interface Database {
  transactions: TransactionTable;
}

export type { Database };

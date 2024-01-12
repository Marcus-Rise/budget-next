import type { TransactionTable } from '@/transaction/repository/transaction.table';

interface Database {
  transactions: TransactionTable;
}

export type { Database };

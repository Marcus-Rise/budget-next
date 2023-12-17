import { Transaction } from '@/transaction/transaction.types';
import { TransactionTable } from '@/transaction/transaction.table';

type TransactionRepositoryQuery = { userId: string };

interface ITransactionRepository {
  list(query: TransactionRepositoryQuery): Promise<Transaction[]>;
  save(dto: Omit<TransactionTable, 'id'> & { id?: string }): Promise<void>;
  remove(id: string): Promise<void>;
}

export type { ITransactionRepository, TransactionRepositoryQuery };

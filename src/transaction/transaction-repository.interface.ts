import type { Transaction } from '@/transaction/transaction.types';
import type { TransactionTable } from '@/transaction/transaction.table';

type TransactionRepositoryQuery = Partial<{ userId: string; dateStart: Date; dateEnd: Date }>;

interface ITransactionRepository {
  list(query?: TransactionRepositoryQuery): Promise<Transaction[]>;
  save(dto: Omit<TransactionTable, 'id'> & { id?: string }): Promise<void>;
  remove(id: string): Promise<void>;
}

export type { ITransactionRepository, TransactionRepositoryQuery };

import { Transaction } from '@/transaction/transaction.types';
import { TransactionEntityType } from '@/transaction/transaction.entity';

type TransactionRepositoryQuery = { userId: string };

interface ITransactionRepository {
  list(query: TransactionRepositoryQuery): Promise<Transaction[]>;
  save(dto: Omit<TransactionEntityType, 'uuid'> & { uuid?: string }): Promise<void>;
  remove(uuid: string): Promise<void>;
}

export type { ITransactionRepository, TransactionRepositoryQuery };

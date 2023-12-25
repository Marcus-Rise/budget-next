import { TransactionRepositoryQuery } from '@/transaction/transaction-repository.interface';
import { Transaction } from '@/transaction/transaction.types';
import { TransactionRemoveDto, TransactionSaveDto } from '@/transaction/transaction.dto';

interface ITransactionService {
  getAll(query?: Omit<TransactionRepositoryQuery, 'userId'>): Promise<Transaction[]>;

  save(dto: TransactionSaveDto): Promise<void>;

  remove(dto: TransactionRemoveDto): Promise<void>;
}

export type { ITransactionService };

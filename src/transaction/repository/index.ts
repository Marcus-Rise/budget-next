import { TransactionRepository } from '@/transaction/repository/transaction.repository';
import { db } from '@/db';

const transactionRepository = new TransactionRepository(db);

export { transactionRepository };
export * from './transaction.repository';

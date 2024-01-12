import { TransactionService } from '@/transaction/service/transaction.service';
import { authService } from '@/auth/service';
import type { ITransactionService } from '@/transaction/service/transaction-service.interface';
import { transactionRepository } from '@/transaction/repository';

export const transactionService: ITransactionService = new TransactionService(
  transactionRepository,
  authService,
);

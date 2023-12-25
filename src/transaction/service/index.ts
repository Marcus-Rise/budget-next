import { TransactionRepository } from '@/transaction/transaction.repository';
import { TransactionService } from '@/transaction/service/transaction.service';
import { authService } from '@/auth/service';
import { ITransactionService } from '@/transaction/service/transaction-service.interface';

export const transactionService: ITransactionService = new TransactionService(
  new TransactionRepository(),
  authService,
);

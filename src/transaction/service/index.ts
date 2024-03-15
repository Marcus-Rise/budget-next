import { TransactionService } from '@/transaction/service/transaction.service';
import { authService } from '@/auth/service';
import type { ITransactionService } from '@/transaction/service/transaction-service.interface';
import { transactionRepository } from '@/transaction/repository';
import { oauthService } from '@/oauth/service';

export const transactionService: ITransactionService = new TransactionService(
  transactionRepository,
  authService,
  oauthService,
);

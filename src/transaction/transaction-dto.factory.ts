import { TransactionSaveDto } from '@/transaction/transaction.dto';

abstract class TransactionDtoFactory {
  static empty(): Partial<TransactionSaveDto> {
    return {
      date: new Date(),
    };
  }
}

export { TransactionDtoFactory };

import type { TransactionSaveDto } from '@/transaction/transaction.dto';
import type { Transaction } from '@/transaction/transaction.types';

abstract class TransactionDtoFactory {
  static empty(): Partial<TransactionSaveDto> {
    return {
      date: new Date(),
    };
  }

  static copy(model: Transaction): TransactionSaveDto {
    return {
      title: model.title,
      category: model.category,
      amount: model.amount,
      date: model.date,
    };
  }
}

export { TransactionDtoFactory };

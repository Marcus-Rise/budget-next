import { Transaction } from '@/transaction/transaction.types';
import { TransactionEntityType } from '@/transaction/transaction.entity';

type NullOrUndefined<T> = {
  [key in keyof T]?: T[key] | null | undefined;
};

abstract class TransactionFactory {
  static fromEntity({
    title,
    category,
    amount,
    date,
    uuid,
  }: NullOrUndefined<TransactionEntityType>): Transaction {
    return {
      title: title ?? '',
      amount: amount ?? 0,
      category: category ?? '',
      date: date ?? new Date(),
      uuid: uuid ?? '',
    };
  }
}

export { TransactionFactory };

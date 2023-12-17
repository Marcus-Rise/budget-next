import 'server-only';
import { Transaction } from '@/transaction/transaction.types';
import { TransactionEntity, TransactionEntityType } from '@/transaction/transaction.entity';
import { TransactionFactory } from '@/transaction/transaction.factory';
import {
  ITransactionRepository,
  TransactionRepositoryQuery,
} from '@/transaction/transaction-repository.interface';
import { v4 as uuidGenerator } from 'uuid';

class TransactionRepository implements ITransactionRepository {
  constructor() {}
  async list(query: TransactionRepositoryQuery): Promise<Transaction[]> {
    const items = await TransactionEntity.find({ userId: query.userId }).exec();

    return items.map((item) => TransactionFactory.fromEntity(item));
  }

  async save(model: Omit<TransactionEntityType, 'uuid'> & { uuid?: string }): Promise<void> {
    const { uuid } = model;

    if (!!uuid) {
      await TransactionEntity.findOneAndUpdate(
        {
          uuid,
        },
        model,
      );
    } else {
      await TransactionEntity.create({ ...model, uuid: uuidGenerator() });
    }
  }

  async remove(uuid: string): Promise<void> {
    await TransactionEntity.findOneAndDelete({ uuid });
  }
}

export { TransactionRepository };

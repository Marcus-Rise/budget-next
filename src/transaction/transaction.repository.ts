import 'server-only';
import { Transaction } from '@/transaction/transaction.types';
import {
  ITransactionRepository,
  TransactionRepositoryQuery,
} from '@/transaction/transaction-repository.interface';
import { TransactionTable } from '@/transaction/transaction.table';
import { db } from '@/db';

class TransactionRepository implements ITransactionRepository {
  constructor() {}
  async list(query?: TransactionRepositoryQuery): Promise<Transaction[]> {
    let queryBuilder = db.selectFrom('transactions').selectAll();

    if (query?.userId) {
      queryBuilder = queryBuilder.where('userId', '=', query.userId);
    }

    if (query?.dateStart) {
      queryBuilder = queryBuilder.where('date', '>=', query?.dateStart);
    }

    if (query?.dateEnd) {
      queryBuilder = queryBuilder.where('date', '<=', query?.dateEnd);
    }

    const items = await queryBuilder.execute();

    return items.map(({ amount, category, date, title, id }) => ({
      amount,
      category,
      date,
      title,
      uuid: id,
    }));
  }

  async save({
    amount,
    userId,
    category,
    id,
    date,
    title,
  }: Omit<TransactionTable, 'id'> & { id?: string }): Promise<void> {
    if (!!id) {
      await db
        .updateTable('transactions')
        .set({
          amount,
          category,
          date,
          title,
        })
        .where('id', '=', id)
        .execute();
    } else {
      await db
        .insertInto('transactions')
        .values({
          amount,
          userId,
          category,
          date,
          title,
        })
        .execute();
    }
  }

  async remove(id: string): Promise<void> {
    await db.deleteFrom('transactions').where('id', '=', id).execute();
  }
}

export { TransactionRepository };

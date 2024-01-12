import 'server-only';
import type { Transaction } from '@/transaction/transaction.types';
import type {
  ITransactionRepository,
  TransactionRepositoryQuery,
} from '@/transaction/repository/transaction-repository.interface';
import type { TransactionTable } from '@/transaction/repository/transaction.table';
import type { Kysely } from 'kysely';
import type { Database } from '@/db/database.types';

class TransactionRepository implements ITransactionRepository {
  constructor(private readonly _db: Kysely<Database>) {}

  async list(query?: TransactionRepositoryQuery): Promise<Transaction[]> {
    let queryBuilder = this._db.selectFrom('transactions').selectAll().orderBy('date', 'desc');

    if (query?.userId) {
      queryBuilder = queryBuilder.where('userId', '=', query.userId);
    }

    if (query?.dateStart) {
      queryBuilder = queryBuilder.where('date', '>=', query.dateStart);
    }

    if (query?.dateEnd) {
      queryBuilder = queryBuilder.where('date', '<=', query.dateEnd);
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
      await this._db
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
      await this._db
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
    await this._db.deleteFrom('transactions').where('id', '=', id).execute();
  }
}

export { TransactionRepository };

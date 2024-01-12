import 'dotenv-flow/config';
import type { TransactionTable } from '@/transaction/transaction.table';
// @ts-ignore
import data from './seed.json';
import type { Kysely } from 'kysely';
import type { Database } from '@/db/database.types';
import { db } from '@/db';

type TransactionDto = {
  uuid: string;
  title: string;
  category: string;
  amount: number;
  type: 'Доход' | string;
  date: string;
};

const TransactionTableFactory = (
  dto: TransactionDto,
  userId: string,
): Omit<TransactionTable, 'id'> & { id: string } => {
  return {
    id: dto.uuid,
    date: new Date(dto.date),
    category: dto.category,
    title: dto.title,
    amount: dto.type === 'Доход' ? dto.amount : -dto.amount,
    userId,
  };
};

const seed = async (db: Kysely<Database>, userId: string, items: TransactionDto[]) => {
  const transactions = items.map((item) => TransactionTableFactory(item, userId));

  await db.insertInto('transactions').values(transactions).execute();
};

seed(db, data.userId, data.items);

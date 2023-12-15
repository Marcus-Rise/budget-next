import { Transaction } from '@/transaction/transaction.types';
import data from './transaction.data.json';

class TransactionService {
  async getAll(): Promise<Transaction[]> {
    return data.map((item) => ({
      ...item,
      date: new Date(item.date),
      amount: item.type === 'Расход' ? Number(`-${item.amount}`) : item.amount,
    }));
  }
}

export { TransactionService };

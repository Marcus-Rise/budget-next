import 'server-only';

import { Transaction } from '@/transaction/transaction.types';
import { ITransactionRepository } from '@/transaction/transaction-repository.interface';
import { TransactionRepository } from '@/transaction/transaction.repository';
import { cookies } from 'next/headers';
import { TransactionRemoveDto, TransactionSaveDto } from '@/transaction/transaction.dto';
import { TransactionTable } from '@/transaction/transaction.table';
import lastDayOfMonth from 'date-fns/lastDayOfMonth';
import format from 'date-fns/format';
import parse from 'date-fns/parse';

class TransactionService {
  private readonly _repo: ITransactionRepository;
  private readonly _userId: string;

  constructor() {
    this._userId = cookies().get('UserId')?.value!;
    this._repo = new TransactionRepository();
  }

  async getAll(): Promise<Transaction[]> {
    const today = new Date();
    const firstDateOfMonth = parse(format(today, 'yyyy-MM-01'), 'yyyy-MM-01', new Date());
    const lastDateOfMonth = lastDayOfMonth(today);

    return this._repo
      .list({
        userId: this._userId,
        dateStart: firstDateOfMonth,
        dateEnd: lastDateOfMonth,
      })
      .catch((e) => {
        console.error(e);
        return [];
      });
  }

  async save({ uuid, ...dto }: TransactionSaveDto): Promise<void> {
    const model: Omit<TransactionTable, 'id'> & { id?: string } = {
      ...dto,
      id: uuid,
      userId: this._userId,
    };

    await this._repo.save(model);
  }

  async remove(dto: TransactionRemoveDto): Promise<void> {
    await this._repo.remove(dto.uuid);
  }
}

export { TransactionService };

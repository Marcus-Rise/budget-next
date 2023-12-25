import 'server-only';

import { Transaction } from '@/transaction/transaction.types';
import {
  ITransactionRepository,
  TransactionRepositoryQuery,
} from '@/transaction/transaction-repository.interface';
import { TransactionRemoveDto, TransactionSaveDto } from '@/transaction/transaction.dto';
import { TransactionTable } from '@/transaction/transaction.table';
import { IAuthService } from '@/auth/service/auth-service.interface';
import { ITransactionService } from '@/transaction/service/transaction-service.interface';

class TransactionService implements ITransactionService {
  constructor(
    private readonly _repo: ITransactionRepository,
    private readonly _auth: IAuthService,
  ) {}

  async getAll(query?: Omit<TransactionRepositoryQuery, 'userId'>): Promise<Transaction[]> {
    const { userId } = await this._auth.getOauthCredentials();

    return this._repo.list({
      userId: String(userId),
      ...query,
    });
  }

  async save({ uuid, ...dto }: TransactionSaveDto): Promise<void> {
    const { userId } = await this._auth.getOauthCredentials();

    const model: Omit<TransactionTable, 'id'> & { id?: string } = {
      ...dto,
      id: uuid,
      userId: String(userId),
    };

    await this._repo.save(model);
  }

  async remove(dto: TransactionRemoveDto): Promise<void> {
    await this._repo.remove(dto.uuid);
  }
}

export { TransactionService };

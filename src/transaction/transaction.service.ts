import 'server-only';

import { Transaction } from '@/transaction/transaction.types';
import {
  ITransactionRepository,
  TransactionRepositoryQuery,
} from '@/transaction/transaction-repository.interface';
import { TransactionRepository } from '@/transaction/transaction.repository';
import { TransactionRemoveDto, TransactionSaveDto } from '@/transaction/transaction.dto';
import { TransactionTable } from '@/transaction/transaction.table';
import { IOauthService } from '@/oauth/oauth-service.interface';
import { oauthService } from '@/oauth/oauth.service';

class TransactionService {
  constructor(
    private readonly _repo: ITransactionRepository,
    private readonly _oauth: IOauthService,
  ) {}

  async getAll(query?: Omit<TransactionRepositoryQuery, 'userId'>): Promise<Transaction[]> {
    const { userId } = await oauthService.checkAuth();

    return this._repo
      .list({
        userId: String(userId),
        ...query,
      })
      .catch((e) => {
        console.error(e);
        return [];
      });
  }

  async save({ uuid, ...dto }: TransactionSaveDto): Promise<void> {
    const { userId } = await oauthService.checkAuth();

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

export const transactionService = new TransactionService(new TransactionRepository(), oauthService);

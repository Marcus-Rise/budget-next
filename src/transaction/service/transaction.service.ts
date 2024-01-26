import 'server-only';

import type { Transaction } from '@/transaction/transaction.types';
import type {
  ITransactionRepository,
  TransactionRepositoryQuery,
} from '@/transaction/repository/transaction-repository.interface';
import type { TransactionRemoveDto, TransactionSaveDto } from '@/transaction/transaction.dto';
import type { IAuthService } from '@/auth/service/auth-service.interface';
import type { ITransactionService } from '@/transaction/service/transaction-service.interface';

class TransactionService implements ITransactionService {
  constructor(
    private readonly _repo: ITransactionRepository,
    private readonly _auth: IAuthService,
  ) {}

  async getAll(query?: Omit<TransactionRepositoryQuery, 'userId'>): Promise<Transaction[]> {
    const { userId } = await this._auth.getOauthCredentials();

    return this._repo.list({
      ...query,
      userId: String(userId),
    });
  }

  async save({ uuid, ...dto }: TransactionSaveDto): Promise<void> {
    const { userId } = await this._auth.getOauthCredentials();

    await this._repo.save({
      ...dto,
      id: uuid,
      userId: String(userId),
    });
  }

  async remove(dto: TransactionRemoveDto): Promise<void> {
    await this._repo.remove(dto.uuid);
  }
}

export { TransactionService };

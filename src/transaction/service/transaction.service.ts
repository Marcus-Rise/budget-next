import 'server-only';

import type { Transaction } from '@/transaction/transaction.types';
import type {
  ITransactionRepository,
  TransactionRepositoryQuery,
} from '@/transaction/repository/transaction-repository.interface';
import type { TransactionRemoveDto, TransactionSaveDto } from '@/transaction/transaction.dto';
import type { IAuthService } from '@/auth/service/auth-service.interface';
import type { ITransactionService } from '@/transaction/service/transaction-service.interface';
import type { IOauthService } from '@/oauth/service/oauth-service.interface';

class TransactionService implements ITransactionService {
  constructor(
    private readonly _repo: ITransactionRepository,
    private readonly _auth: IAuthService,
    private readonly _oauth: IOauthService,
  ) {}

  async getAll(query?: Omit<TransactionRepositoryQuery, 'userId'>): Promise<Transaction[]> {
    const { oauthId } = await this._auth.getPayload();
    const { userId } = await this._oauth.getCredentials(oauthId);

    return this._repo.list({
      ...query,
      userId: String(userId),
    });
  }

  async save({ uuid, ...dto }: TransactionSaveDto): Promise<void> {
    const { oauthId } = await this._auth.getPayload();
    const { userId } = await this._oauth.getCredentials(oauthId);

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

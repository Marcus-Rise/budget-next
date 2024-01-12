import 'server-only';

import type { Transaction } from '@/transaction/transaction.types';
import type {
  ITransactionRepository,
  TransactionRepositoryQuery,
} from '@/transaction/transaction-repository.interface';
import type { TransactionRemoveDto, TransactionSaveDto } from '@/transaction/transaction.dto';
import type { TransactionTable } from '@/transaction/transaction.table';
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

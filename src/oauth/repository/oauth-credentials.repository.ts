import 'server-only';
import type { OauthCredentials } from '@/oauth/oauth.types';
import type {
  IOauthCredentialsRepository,
  OauthCredentialsRepositoryQuery,
} from '@/oauth/repository/oauth-credentials-repository.interface';
import type { Kysely } from 'kysely';
import type { Database } from '@/db/database.types';
import type { OauthCredentialsCreateDto } from '@/oauth/repository/oauth-credentials-create.dto';

export class OauthCredentialsRepository implements IOauthCredentialsRepository {
  constructor(private readonly _db: Kysely<Database>) {}

  async create(dto: OauthCredentialsCreateDto): Promise<OauthCredentials> {
    const existsItem = await this._db
      .selectFrom('oauthCredentials')
      .selectAll()
      .where('tokenId', '=', dto.tokenId)
      .where('userId', '=', dto.userId)
      .executeTakeFirst();

    if (existsItem) {
      return existsItem;
    }

    return this._db
      .insertInto('oauthCredentials')
      .values({
        accessToken: dto.accessToken,
        userId: dto.userId,
        tokenId: dto.tokenId,
        expire: dto.expire,
      })
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async find(query?: OauthCredentialsRepositoryQuery): Promise<OauthCredentials | undefined> {
    let queryBuilder = this._db.selectFrom('oauthCredentials').selectAll();

    if (query?.id) {
      queryBuilder = queryBuilder.where('id', '=', query.id);
    }

    if (query?.userId) {
      queryBuilder = queryBuilder.where('userId', '=', query.userId);
    }

    if (query?.tokenId) {
      queryBuilder = queryBuilder.where('tokenId', '=', query.tokenId);
    }

    return queryBuilder.executeTakeFirst();
  }

  async remove(query: OauthCredentialsRepositoryQuery): Promise<void> {
    let queryBuilder = this._db.deleteFrom('oauthCredentials');

    if (query.id) {
      queryBuilder.where('id', '=', query.id);
    }

    if (query.userId) {
      queryBuilder.where('userId', '=', query.userId);
    }

    if (query.tokenId) {
      queryBuilder.where('tokenId', '=', query.tokenId);
    }

    await queryBuilder.execute();
  }
}

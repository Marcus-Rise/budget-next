import 'server-only';
import type { OauthCredentials } from '@/oauth/oauth.types';
import type { IOauthCredentialsRepository } from '@/oauth/repository/oauth-credentials-repository.interface';
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

  async find(query: { id: OauthCredentials['id'] }): Promise<OauthCredentials | undefined> {
    return this._db
      .selectFrom('oauthCredentials')
      .selectAll()
      .where('id', '=', query.id)
      .executeTakeFirst();
  }

  async remove(query: { id: OauthCredentials['id'] }): Promise<void> {
    await this._db.deleteFrom('oauthCredentials').where('id', '=', query.id).execute();
  }
}

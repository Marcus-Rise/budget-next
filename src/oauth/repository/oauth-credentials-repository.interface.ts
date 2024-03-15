import type { OauthCredentials } from '@/oauth/oauth.types';
import type { OauthCredentialsCreateDto } from '@/oauth/repository/oauth-credentials-create.dto';

type OauthCredentialsRepositoryQuery = Partial<Pick<OauthCredentials, 'id' | 'userId' | 'tokenId'>>;

interface IOauthCredentialsRepository {
  create(dto: OauthCredentialsCreateDto): Promise<OauthCredentials>;

  find(query: { id: OauthCredentials['id'] }): Promise<OauthCredentials | undefined>;

  remove(query: OauthCredentialsRepositoryQuery): Promise<void>;
}

export type { IOauthCredentialsRepository, OauthCredentialsRepositoryQuery };

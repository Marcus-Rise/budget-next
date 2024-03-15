import 'server-only';
import type { Generated } from 'kysely';

interface OauthCredentialsTable {
  id: Generated<string>;
  tokenId: string;
  accessToken: string;
  userId: string;
  expire: Date;
}

export type { OauthCredentialsTable };

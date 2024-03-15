import { OauthCredentialsRepository } from '@/oauth/repository/oauth-credentials.repository';
import { db } from '@/db';

export const oauthCredentialsRepository = new OauthCredentialsRepository(db);
export * from './oauth-credentials-repository.interface';
export * from './oauth-credentials-create.dto';

import type { IOauthService } from '@/oauth/service/oauth-service.interface';
import { oauthConfigFactory } from '@/oauth/config';
import { OauthService } from '@/oauth/service/oauth.service';
import { oauthCredentialsRepository } from '@/oauth/repository';

export const oauthService: IOauthService = new OauthService(
  oauthConfigFactory(),
  oauthCredentialsRepository,
);

import type { OauthAccessTokenResponseDto } from '@/oauth/oauth.types';
import type { OauthCredentialsCreateDto } from '@/oauth/repository';

export abstract class OauthCredentialsDtoFactory {
  static fromOauthAccessTokenResponseDto(
    dto: OauthAccessTokenResponseDto['response'],
    expire: Date,
  ): OauthCredentialsCreateDto {
    return {
      tokenId: dto.access_token_id,
      userId: String(dto.user_id),
      accessToken: dto.access_token,
      expire,
    };
  }
}

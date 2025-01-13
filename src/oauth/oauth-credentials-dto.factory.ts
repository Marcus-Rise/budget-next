import type { OauthAccessTokenResponseDto } from '@/oauth/oauth.types';
import type { OauthCredentialsCreateDto } from '@/oauth/repository';
import { addMinutes } from 'date-fns/addMinutes';

export abstract class OauthCredentialsDtoFactory {
  static fromOauthAccessTokenResponseDto(
    dto: OauthAccessTokenResponseDto,
  ): OauthCredentialsCreateDto {
    const expire = addMinutes(new Date(), dto.expires_in);

    return {
      tokenId: dto.id_token, // todo убрать
      userId: String(dto.user_id),
      accessToken: dto.access_token,
      expire,
    };
  }
}

type OauthAccessTokenResponseDto = {
  refresh_token: string;
  access_token: string;
  id_token: string;
  token_type: 'Bearer' | string;
  expires_in: number;
  user_id: number;
  state: string;
  scope: string;
};

type OauthCredentials = {
  id: string;
  userId: string;
  accessToken: string;
  tokenId: string;
  expire: Date;
};

export type OauthAccessCodeResponseDto = {
  code: string;
  state: string;
  type: string;
  device_id: string;
};

export type OauthResponseError = {
  error: string;
  error_description: string;
};

export type OauthProfileInfoResponseDto = {
  user: {
    user_id: string;
    first_name: string;
    last_name: string;
    phone: string;
    avatar: string;
    email: string;
  };
};

export type { OauthAccessTokenResponseDto, OauthCredentials };

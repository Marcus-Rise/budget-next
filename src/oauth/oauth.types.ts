type OauthSilentTokenPayload = {
  type: 'silent_token' | string;
  token: string;
  ttl: number;
  uuid: string;
  user: {
    first_name: string;
    avatar: string;
  };
};

type OauthAccessTokenRequestDto = {
  /**
   * version
   */
  v: string;
  token: string;
  access_token: string;
  uuid: string;
};

type OauthAccessTokenResponseDto = {
  response: {
    access_token: string;
    access_token_id: string;
    user_id: number;
    phone: string;
    /**
     * date
     */
    phone_validated: number;
    is_service: boolean;
    email: string;
    source: number;
    source_description: string;
  };
};

type OauthAccessTokenCheckResponseDto = {
  response: {
    success: number;
    user_id: number;
    date: number;
    expire: number;
  };
};

export type {
  OauthSilentTokenPayload,
  OauthAccessTokenRequestDto,
  OauthAccessTokenResponseDto,
  OauthAccessTokenCheckResponseDto,
};

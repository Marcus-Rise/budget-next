export type OauthCredentialsCreateDto = {
  tokenId: string;
  userId: string;
  accessToken: string;

  expire: Date;
};

class OauthLoginException extends Error {
  constructor(message?: string) {
    super(message);
  }
}

export { OauthLoginException };

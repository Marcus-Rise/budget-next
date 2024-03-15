class OauthException extends Error {
  constructor(message?: string) {
    super('OauthException:' + message);
  }
}

export { OauthException };

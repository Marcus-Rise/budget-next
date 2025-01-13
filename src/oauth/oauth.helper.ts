// import Base64 from 'crypto-js/enc-base64';
// import sha256 from 'crypto-js/sha256';

/**
 * Генерация code challenge для нового oauth
 */
/*const generateCodeChallenge = (codeVerifier: string): string => {
  const hash = sha256(codeVerifier);
  const base64 = Base64.stringify(hash);

  return base64.replace(/=*$/g, '').replace(/\+/g, '-').replace(/\//g, '_');
};*/

const generateRandomBase64String = async (length = 24) =>
  Buffer.from(crypto.getRandomValues(new Uint8Array(length))).toString('base64url');

const computeCodeChallengeFromVerifier = async (verifier: string) => {
  const hashedValue = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier));

  return Buffer.from(hashedValue).toString('base64url');
};

const isCodeVerifierValid = async (codeVerifier: string, codeChallenge: string) =>
  (await computeCodeChallengeFromVerifier(codeVerifier)) === codeChallenge;

export { computeCodeChallengeFromVerifier };

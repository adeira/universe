// @flow strict

import crypto from 'crypto';

const GENERATED = '@generated';
const TOKEN = '<<SignedSource::*O*zOeWoEQle#+L!plEphiEmie@IsG>>';
const PATTERN = new RegExp(`${GENERATED} (?:SignedSource<<([a-f0-9]{32})>>)`);

const TokenNotFoundError: Error = new Error(
  `SignedSource.signFile(...): Cannot sign file without token: ${TOKEN}`,
);

function hash(data, encoding) {
  const md5sum = crypto.createHash('md5');
  md5sum.update(data, encoding);
  return md5sum.digest('hex');
}

/**
 * Utility for signing and verifying the signature of a file. This is useful for
 * ensuring that the contents of a generated file are not contaminated by manual
 * changes. Example usage:
 *
 *   const myFile = `
 *     // ${SignedSource.getSigningToken()}
 *
 *     console.log('My generated file.');
 *   `;
 *   const mySignedFile = SignedSource.signFile(myFile);
 *
 * This packages originated from https://github.com/facebook/fbjs
 * (cleaned up and tweaked for our use-case).
 */
const SignedSource = {
  TokenNotFoundError,

  /**
   * Gets the signing token to be embedded in the file you wish to be signed.
   */
  getSigningToken(): string {
    return `${GENERATED} ${TOKEN}`;
  },

  /**
   * Checks whether a file is signed *without* verifying the signature.
   */
  isSigned(data: string): boolean {
    return !!PATTERN.exec(data);
  },

  /**
   * Signs a source file which contains a signing token. Signing modifies only
   * the signing token, so the token should be placed inside a comment in order
   * for signing to not change code semantics.
   */
  signFile(data: string): string | empty {
    let dataCopy = data;
    if (!dataCopy.includes(TOKEN)) {
      if (SignedSource.isSigned(dataCopy)) {
        // Signing a file that was previously signed.
        dataCopy = dataCopy.replace(PATTERN, SignedSource.getSigningToken());
      } else {
        throw TokenNotFoundError;
      }
    }
    return dataCopy.replace(TOKEN, `SignedSource<<${hash(dataCopy, 'utf8')}>>`);
  },

  /**
   * Verifies the signature in a signed file.
   */
  verifySignature(data: string): boolean | empty {
    const matches = PATTERN.exec(data);
    if (!matches) {
      throw new Error(
        'SignedSource.verifySignature(...): Cannot verify signature of an unsigned file.',
      );
    }
    const actual = matches[1];
    const unsigned = data.replace(PATTERN, `${GENERATED} ${TOKEN}`);
    return hash(unsigned, 'utf8') === actual;
  },
};

export default SignedSource;

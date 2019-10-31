// @flow strict

import crypto from 'crypto';

export default function createQueryID(text: string): string {
  const hasher = crypto.createHash('md5');
  hasher.update(text);
  return hasher.digest('hex');
}

// @flow

import os from 'os';

import SignedSource from '../SignedSource';

test('signFile', () => {
  expect(
    SignedSource.signFile(`# ${SignedSource.getSigningToken()}\ntest 1`),
  ).toEqual(
    '# @generated SignedSource<<d9b7b52f54978f54b84a0fd48145e470>>' +
      os.EOL +
      'test 1',
  );

  expect(
    SignedSource.signFile(`# ${SignedSource.getSigningToken()}\ntest 2`),
  ).toEqual(
    '# @generated SignedSource<<4c0c1ae4f5863c72731b2f543e830fd5>>' +
      os.EOL +
      'test 2',
  );
});

test('isSigned', () => {
  const signedString = SignedSource.signFile(
    `# ${SignedSource.getSigningToken()}\ntest`,
  );

  expect(SignedSource.isSigned(signedString)).toBe(true);
  expect(SignedSource.isSigned(signedString + 'modified')).toBe(true);
  expect(SignedSource.isSigned('unsigned')).toBe(false);
});

test('verifySignature', () => {
  const signedString = SignedSource.signFile(
    `# ${SignedSource.getSigningToken()}\ntest`,
  );

  expect(SignedSource.verifySignature(signedString)).toBe(true);
  expect(SignedSource.verifySignature(signedString + 'modified')).toBe(false);
  expect(() => {
    SignedSource.verifySignature('unsigned');
  }).toThrow(
    'SignedSource.verifySignature(...): Cannot verify signature of an unsigned file.',
  );
});

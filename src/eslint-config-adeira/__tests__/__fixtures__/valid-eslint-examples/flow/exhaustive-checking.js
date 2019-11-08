// @flow strict

// eslint-disable-next-line no-unused-vars
const invariantMock = (condition, format, ...args) => {
  if (!condition) {
    throw new Error(format);
  }
};

type Cases = 'A' | 'B';

export function exhaustA(x: Cases) {
  if (x === 'A') {
    // do stuff
  } else if (x === 'B') {
    // do different stuff
  } else {
    // only true if we handled all cases
    (x: empty);
  }
}

export function exhaustB(
  reason: 'magicLink' | 'signUpConfirmation' | 'resetPassword',
): void | string {
  switch (reason) {
    case 'magicLink':
      return 'account.check_email_magic_link';
    case 'signUpConfirmation':
      return 'account.check_email_sign_up';
    case 'resetPassword':
      return 'account.you_will_recieve_password';
    default:
      return invariantMock(false, 'Unsupported reason: %j', (reason: empty));
  }
}

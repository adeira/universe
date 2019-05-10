// @flow strict

type Cases = 'A' | 'B';

export default function exhaust(x: Cases) {
  if (x === 'A') {
    // do stuff
  } else if (x === 'B') {
    // do different stuff
  } else {
    // only true if we handled all cases
    (x: empty);
  }
}

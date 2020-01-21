// @flow strict

import { encode, decode } from '../Encoder';

// Please note: we are keeping backward compatibility of the decoder only. You should not modify
// the following test-cases unless you want to break this compatibility.
test.each([
  // first algorithm version (pure Base64)
  [1, 'Type:123', 'VHlwZToxMjM='], // we used to keep trailing slashes
  [1, 'Typename:123', 'VHlwZW5hbWU6MTIz'],
  [1, '???:123', 'Pz8/OjEyMw=='], // we used to generate URL incompatible output
  [1, '<<???>>', 'PDw/Pz8+Pg=='], // '+' used to be fine as well

  // second iteration of the algorithm (modified Base64)
  [2, 'Type:123', 'VHlwZToxMjM'],
  [2, 'Typename:123', 'VHlwZW5hbWU6MTIz'],
  [2, '???:123', 'Pz8_OjEyMw'],
  [2, '<<???>>', 'PDw_Pz8-Pg'],
])('%#) encoder v%s works with the string "%s" correctly ("%s")', (version, raw, masked) => {
  // it has to be reversible
  expect(decode(encode(raw))).toBe(raw);

  // it has to be possible to decode it
  expect(decode(masked)).toEqual(raw);

  if (version === 2) {
    // we generate v2 output (incompatible with v1 encoder but compatible with v2 decoder)
    expect(encode(raw)).toBe(masked);
  }
});

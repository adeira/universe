// @flow strict

export opaque type OpaqueIDString: string = string;

// Simple base64 generates 'a-zA-Z0-9+/=' characters. However, some of these characters are being
// reserved for URL purposes. See: https://tools.ietf.org/html/rfc3986#section-2.3
//
//     unreserved  = ALPHA / DIGIT / "-" / "." / "_" / "~"
//
// However, We want to be able to use GraphQL ID in URL as well.
// More info: https://stackoverflow.com/questions/1374753/passing-base64-encoded-strings-in-url
const encodeTable = {
  '+': '-',
  '/': '_',
  '=': '~',
};

const decodeTable = {
  '-': '+',
  _: '/',
  '~': '=',
};

export function encode(i: string): OpaqueIDString {
  return Buffer.from(i, 'utf8')
    .toString('base64')
    .replace(/[=]{1,}$/, '') // '=' padding is not necessary (https://github.com/nodejs/node/blob/f0d2df41f8716670435b284e987b2fcc23221947/src/base64.h#L27)
    .replace(/[+/=]/g, match => {
      return encodeTable[match];
    });
}

export function decode(i: OpaqueIDString): string {
  return Buffer.from(
    i.replace(/[-_~]/g, match => {
      // Is this necessary? Somehow, Node.js is able to decode even our modified Base64 version 🤔
      // Try invalid: Buffer.from('PDw_Pz8-Pg', 'base64').toString('utf8')
      return decodeTable[match];
    }),
    'base64',
  ).toString('utf8');
}

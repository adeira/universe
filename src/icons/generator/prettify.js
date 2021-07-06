// @flow

import prettier from 'prettier';

export default async function prettify(uglyCode: string): Promise<string> {
  const config = await prettier.resolveConfig(__filename);
  return prettier.format(uglyCode, {
    parser: 'flow',
    ...config,
  });
}

/**
 * This code should NOT report `no-unused-vars` error on FBT import, see:
 * https://github.com/yannickcr/eslint-plugin-react/issues/3080
 *
 * @flow
 */

import fbt from 'fbt'; // eslint-disable-line import/no-extraneous-dependencies
import type { Node } from 'react';

export default function MyComponent(): Node {
  return <fbt desc="…">test</fbt>;
}

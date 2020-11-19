/**
 * @flow
 * @eslintExpectedError SX function "styles" was not used anywhere in the code.
 * @eslintExpectedError Unused stylesheet: aaa (defined via "styles" variable)
 */

import type { Node } from 'react';
import sx from '@adeira/sx';

const fakeCallExpression = (fake: string) => fake;

export default function MyComponent(): Node {
  return <div className={fakeCallExpression('aaa')} />;
}

// eslint-disable-next-line no-unused-vars
const styles = sx.create({
  aaa: { color: 'red' },
});

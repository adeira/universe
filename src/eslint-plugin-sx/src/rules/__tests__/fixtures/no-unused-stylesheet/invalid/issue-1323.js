/**
 * @flow
 * @eslintExpectedError SX function "styles" was not used anywhere in the code.
 * @eslintExpectedError Unused stylesheet: notUsing (defined via "styles" variable)
 *
 * @see https://github.com/adeira/universe/pull/1323
 */

import sx from '@adeira/sx';
import type { Node } from 'react'; // keep the import order exactly like this (first SX, second React)

export default function Navbar(): Node {
  return <div style={{ color: 'red' }} />;
}

// eslint-disable-next-line no-unused-vars
const styles = sx.create({
  notUsing: {
    opacity: 0,
  },
});

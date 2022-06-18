// @flow

import { invariant } from '@adeira/js';
import { fbt } from 'fbt';
import intlList from 'fbt/lib/intlList';
import type { Node } from 'react';

/* eslint-disable react/jsx-key */

type Props = {
  +quarterNumber: number, // technically only 1, 2, 3, and 4
};

/**
 * 1 – January, February, March
 * 2 – April, May, June
 * 3 – July, August, September
 * 4 – October, November, December
 *
 * See: https://www.arangodb.com/docs/stable/aql/functions-date.html#date_quarter
 */
export default function QuarterNumberToString(props: Props): Node {
  const CONJUNCTIONS = intlList.CONJUNCTIONS;
  const DELIMITERS = intlList.DELIMITERS;

  switch (props.quarterNumber) {
    case 1:
      return intlList(
        [
          <fbt desc="month of January">January</fbt>,
          <fbt desc="month of February">February</fbt>,
          <fbt desc="month of March">March</fbt>,
        ],
        CONJUNCTIONS.AND,
        DELIMITERS.COMMA,
      );
    case 2:
      return intlList(
        [
          <fbt desc="month of April">April</fbt>,
          <fbt desc="month of May">May</fbt>,
          <fbt desc="month of June">June</fbt>,
        ],
        CONJUNCTIONS.AND,
        DELIMITERS.COMMA,
      );
    case 3:
      return intlList(
        [
          <fbt desc="month of July">July</fbt>,
          <fbt desc="month of August">August</fbt>,
          <fbt desc="month of September">September</fbt>,
        ],
        CONJUNCTIONS.AND,
        DELIMITERS.COMMA,
      );
    case 4:
      return intlList(
        [
          <fbt desc="month of October">October</fbt>,
          <fbt desc="month of November">November</fbt>,
          <fbt desc="month of December">December</fbt>,
        ],
        CONJUNCTIONS.AND,
        DELIMITERS.COMMA,
      );
    default:
      invariant(false, 'Unexpected quarter number: %s', props.quarterNumber);
  }
}

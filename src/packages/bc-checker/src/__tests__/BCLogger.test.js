// @flow

import { generateTestsFromFixtures } from '@kiwicom/test-utils';

import { buildBreakingChangesBlock } from '../BCLogger';

function operation(newBreakingChanges) {
  return input => buildBreakingChangesBlock(input, newBreakingChanges);
}

generateTestsFromFixtures(`${__dirname}/__fixtures__`, operation());
generateTestsFromFixtures(
  `${__dirname}/__fixtures__`,
  operation([
    {
      type: 'append',
      description: 'this',
    },
    {
      type: 'and append',
      description: 'also this',
    },
  ]),
);

// @flow

import { generateTestsFromFixtures } from '@kiwicom/test-utils';

import replaceAutomatorTags from '../replaceAutomatorTags';

function operation(taskIdentifier) {
  return input => {
    return replaceAutomatorTags(input, taskIdentifier, 'replaced content 🎉');
  };
}

describe('correct task identifier should replace the tags', () => {
  generateTestsFromFixtures(
    `${__dirname}/__fixtures__`,
    operation('TEST_FIXTURE_1'),
  );
});

describe('unknown task identifier should return unchanged input', () => {
  generateTestsFromFixtures(
    `${__dirname}/__fixtures__`,
    operation('UNKNOWN_TASK_IDENTIFIER'),
  );
});

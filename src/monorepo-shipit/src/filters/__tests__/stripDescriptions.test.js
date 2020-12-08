// @flow strict-local

import stripDescriptions from '../stripDescriptions';
import Changeset from '../../Changeset';

it('strips commit descriptions correctly', () => {
  const changeset = new Changeset()
    .withAuthor('John Doe')
    .withSubject('Commit subject')
    .withDescription('This description should be stripped.');

  expect(changeset).toMatchInlineSnapshot(`
    Changeset {
      "author": "John Doe",
      "debugMessages": undefined,
      "description": "This description should be stripped.",
      "diffs": undefined,
      "id": undefined,
      "subject": "Commit subject",
      "timestamp": undefined,
    }
  `);

  expect(stripDescriptions(changeset)).toMatchInlineSnapshot(`
    Changeset {
      "author": "John Doe",
      "debugMessages": undefined,
      "description": "",
      "diffs": undefined,
      "id": undefined,
      "subject": "Commit subject",
      "timestamp": undefined,
    }
  `);
});

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
      "coAuthorLines": Array [],
      "debugMessages": Array [],
      "description": "This description should be stripped.",
      "subject": "Commit subject",
    }
  `);

  expect(stripDescriptions(changeset)).toMatchInlineSnapshot(`
    Changeset {
      "author": "John Doe",
      "coAuthorLines": Array [],
      "debugMessages": Array [],
      "description": "",
      "subject": "Commit subject",
    }
  `);
});

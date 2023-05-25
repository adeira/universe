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
      "coAuthorLines": [],
      "debugMessages": [],
      "description": "This description should be stripped.",
      "descriptionTransformer": [Function],
      "subject": "Commit subject",
    }
  `);

  expect(stripDescriptions(changeset)).toMatchInlineSnapshot(`
    Changeset {
      "author": "John Doe",
      "coAuthorLines": [],
      "debugMessages": [],
      "description": "",
      "descriptionTransformer": [Function],
      "subject": "Commit subject",
    }
  `);
});

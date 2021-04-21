// @flow strict

import Changeset from '../Changeset';

test('immutability of the changesets', () => {
  const originalChangeset = new Changeset();
  const modifiedChangeset1 = originalChangeset
    .withID('2f0f6ca5039506a1ebc5651a0b7e2b617e28544c')
    .withTimestamp('Mon, 4 Feb 2019 13:29:04 -0600')
    .withAuthor('John Doe')
    .withSubject('Subject 1')
    .withDescription('new description')
    .withDebugMessage('DEBUG %s', 'yadada')
    .withDiffs(
      new Set([
        { path: 'aaa', body: 'AAA' },
        { path: 'bbb', body: 'BBB' },
      ]),
    );

  // everything in the original changeset should be empty
  expect(originalChangeset).toMatchInlineSnapshot(`
    Changeset {
      "coAuthorLines": Array [],
      "debugMessages": Array [],
    }
  `);

  // this should have new values
  expect(modifiedChangeset1).toMatchInlineSnapshot(`
    Changeset {
      "author": "John Doe",
      "coAuthorLines": Array [],
      "debugMessages": Array [
        "DEBUG yadada",
      ],
      "description": "new description",
      "diffs": Set {
        Object {
          "body": "AAA",
          "path": "aaa",
        },
        Object {
          "body": "BBB",
          "path": "bbb",
        },
      },
      "id": "2f0f6ca5039506a1ebc5651a0b7e2b617e28544c",
      "subject": "Subject 1",
      "timestamp": "Mon, 4 Feb 2019 13:29:04 -0600",
    }
  `);

  const modifiedChangeset2 = modifiedChangeset1
    .withDescription('even newer description')
    .withDebugMessage('DEBUG %s', 'should be appended')
    .withDiffs(new Set([{ path: 'ccc', body: 'CCC' }]));

  // should be similar to modified changeset 1 but with some changed values
  expect(modifiedChangeset2).toMatchInlineSnapshot(`
    Changeset {
      "author": "John Doe",
      "coAuthorLines": Array [],
      "debugMessages": Array [
        "DEBUG yadada",
        "DEBUG should be appended",
      ],
      "description": "even newer description",
      "diffs": Set {
        Object {
          "body": "CCC",
          "path": "ccc",
        },
      },
      "id": "2f0f6ca5039506a1ebc5651a0b7e2b617e28544c",
      "subject": "Subject 1",
      "timestamp": "Mon, 4 Feb 2019 13:29:04 -0600",
    }
  `);
});

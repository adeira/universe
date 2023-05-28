// @flow strict-local

import addTrackingData from '../addTrackingData';
import Changeset from '../../Changeset';

it('adds tracking data', () => {
  const changeset = new Changeset()
    .withID('MOCK_COMMIT_ID')
    .withAuthor('John Doe')
    .withSubject('Commit subject')
    .withDescription('Commit description');

  expect(changeset).toMatchInlineSnapshot(`
    Changeset {
      "author": "John Doe",
      "coAuthorLines": [],
      "debugMessages": [],
      "description": "Commit description",
      "id": "MOCK_COMMIT_ID",
      "subject": "Commit subject",
    }
  `);

  expect(addTrackingData(changeset)).toMatchInlineSnapshot(`
    Changeset {
      "author": "John Doe",
      "coAuthorLines": [],
      "debugMessages": [
        "ADD TRACKING DATA: "adeira-source-id: MOCK_COMMIT_ID"",
      ],
      "description": "Commit description

    adeira-source-id: MOCK_COMMIT_ID",
      "id": "MOCK_COMMIT_ID",
      "subject": "Commit subject",
    }
  `);
});

it('adds tracking data with Co-authored-by line', () => {
  const changeset = new Changeset()
    .withID('MOCK_COMMIT_ID')
    .withAuthor('John Doe')
    .withSubject('Commit subject')
    .withDescription('Commit description')
    .withCoAuthorLines([
      'Co-authored-by: Trond Bergquist <trond_bergquist@hotmail.com>',
      'Co-authored-by: Patricia Bergquist <patricia_bergquist@hotmail.com>',
    ]);

  expect(changeset).toMatchInlineSnapshot(`
    Changeset {
      "author": "John Doe",
      "coAuthorLines": [
        "Co-authored-by: Trond Bergquist <trond_bergquist@hotmail.com>",
        "Co-authored-by: Patricia Bergquist <patricia_bergquist@hotmail.com>",
      ],
      "debugMessages": [],
      "description": "Commit description",
      "id": "MOCK_COMMIT_ID",
      "subject": "Commit subject",
    }
  `);

  expect(addTrackingData(changeset)).toMatchInlineSnapshot(`
    Changeset {
      "author": "John Doe",
      "coAuthorLines": [
        "Co-authored-by: Trond Bergquist <trond_bergquist@hotmail.com>",
        "Co-authored-by: Patricia Bergquist <patricia_bergquist@hotmail.com>",
      ],
      "debugMessages": [
        "ADD TRACKING DATA: "adeira-source-id: MOCK_COMMIT_ID"",
      ],
      "description": "Commit description

    adeira-source-id: MOCK_COMMIT_ID

    Co-authored-by: Trond Bergquist <trond_bergquist@hotmail.com>
    Co-authored-by: Patricia Bergquist <patricia_bergquist@hotmail.com>",
      "id": "MOCK_COMMIT_ID",
      "subject": "Commit subject",
    }
  `);
});

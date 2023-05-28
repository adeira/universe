// @flow strict-local

import Config from '../ShipitConfig';
import createMockChangeset from '../utils/createMockChangeset';

jest.mock('fs');

it('returns set of paths when trying to access monorepo roots', () => {
  expect(
    new Config(
      'fake monorepo path',
      'fake exported repo URL',
      new Map([['/known_path', '/destination_path']]),
      new Set([/mocked/]),
    ).getSourceRoots(),
  ).toEqual(new Set(['/known_path']));
});

it('returns empty set when trying to get roots of the exported repo', () => {
  expect(
    new Config(
      'fake monorepo path',
      'fake exported repo URL',
      new Map([['/known_path', '/destination_path']]),
      new Set([/mocked/]),
    ).getDestinationRoots(),
  ).toEqual(
    new Set(), // empty set expected
  );
});

it('creates and runs the default filters', () => {
  const defaultFilter = new Config(
    'fake monorepo path',
    'fake exported repo URL',
    new Map([['/known_path', '/destination_path']]),
    new Set([/mocked/]),
  ).getDefaultShipitFilter();

  expect(defaultFilter(createMockChangeset(2, '/known_path/'))).toMatchSnapshot();
});

it('creates and runs the default filters with Co-authored-by', () => {
  const defaultFilter = new Config(
    'fake monorepo path',
    'fake exported repo URL',
    new Map([['/known_path', '/destination_path']]),
    new Set([/mocked/]),
  ).getDefaultShipitFilter();

  const changeset = createMockChangeset(2, '/known_path/').withCoAuthorLines([
    'Co-authored-by: Trond Bergquist <trond_bergquist@hotmail.com>',
    'Co-authored-by: Patricia Bergquist <patricia_bergquist@hotmail.com>',
  ]);
  expect(defaultFilter(changeset)).toMatchSnapshot();
});

it('should use custom shipit filter', () => {
  const defaultFilter = new Config(
    'fake monorepo path',
    'fake exported repo URL',
    new Map([['/known_path', '/destination_path']]),
    new Set([/mocked/]),
    'origin/master',
    'master',
    (changeset) => {
      return changeset.withDescription('Overridden description');
    },
  ).getDefaultShipitFilter();

  const changeset = createMockChangeset(2, '/known_path/').withCoAuthorLines([
    'Co-authored-by: Trond Bergquist <trond_bergquist@hotmail.com>',
    'Co-authored-by: Patricia Bergquist <patricia_bergquist@hotmail.com>',
  ]);

  expect(defaultFilter(changeset).description).toMatchInlineSnapshot(`
    "Overridden description

    adeira-source-id: 1234567890

    Co-authored-by: Trond Bergquist <trond_bergquist@hotmail.com>
    Co-authored-by: Patricia Bergquist <patricia_bergquist@hotmail.com>"
  `);
});

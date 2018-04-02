// @flow

import { offsetToCursor } from 'graphql-relay';
import { connectionFromArray } from '../ArrayConnection';

// Tests of connectionFromArray are copied from origin implementation:
// https://github.com/graphql/graphql-relay-js/blob/master/src/connection/__tests__/arrayconnection.js
describe('connectionFromArray()', () => {
  const letters = ['A', 'B', 'C', 'D', 'E'];

  describe('basic slicing', () => {
    it('returns all elements without filters', () => {
      const c = connectionFromArray(letters, {});
      expect(c).toMatchSnapshot();
    });

    it('respects a smaller first', () => {
      const c = connectionFromArray(letters, { first: 2 });
      expect(c).toMatchSnapshot();
    });

    it('respects an overly large first', () => {
      const c = connectionFromArray(letters, { first: 10 });
      expect(c).toMatchSnapshot();
    });

    it('respects a smaller last', () => {
      const c = connectionFromArray(letters, { last: 2 });
      expect(c).toMatchSnapshot();
    });

    it('respects an overly large last', () => {
      const c = connectionFromArray(letters, { last: 10 });
      expect(c).toMatchSnapshot();
    });
  });

  describe('pagination', () => {
    it('respects first and after', () => {
      const c = connectionFromArray(letters, {
        first: 2,
        after: offsetToCursor(1),
      });
      expect(c).toMatchSnapshot();
    });

    it('respects first and after with long first', () => {
      const c = connectionFromArray(letters, {
        first: 10,
        after: offsetToCursor(1),
      });
      expect(c).toMatchSnapshot();
    });

    it('respects last and before', () => {
      const c = connectionFromArray(letters, {
        last: 2,
        before: offsetToCursor(3),
      });
      expect(c).toMatchSnapshot();
    });

    it('respects last and before with long last', () => {
      const c = connectionFromArray(letters, {
        last: 10,
        before: offsetToCursor(3),
      });
      expect(c).toMatchSnapshot();
    });

    it('respects first and after and before, too few', () => {
      const c = connectionFromArray(letters, {
        first: 2,
        after: offsetToCursor(0),
        before: offsetToCursor(4),
      });
      expect(c).toMatchSnapshot();
    });

    it('respects first and after and before, too many', () => {
      const c = connectionFromArray(letters, {
        first: 4,
        after: offsetToCursor(0),
        before: offsetToCursor(4),
      });
      expect(c).toMatchSnapshot();
    });

    it('respects first and after and before, exactly right', () => {
      const c = connectionFromArray(letters, {
        first: 3,
        after: offsetToCursor(0),
        before: offsetToCursor(4),
      });
      expect(c).toMatchSnapshot();
    });

    it('respects last and after and before, too few', () => {
      const c = connectionFromArray(letters, {
        last: 2,
        after: offsetToCursor(0),
        before: offsetToCursor(4),
      });
      expect(c).toMatchSnapshot();
    });

    it('respects last and after and before, too many', () => {
      const c = connectionFromArray(letters, {
        last: 4,
        after: offsetToCursor(0),
        before: offsetToCursor(4),
      });
      expect(c).toMatchSnapshot();
    });

    it('respects last and after and before, exactly right', () => {
      const c = connectionFromArray(letters, {
        last: 3,
        after: offsetToCursor(0),
        before: offsetToCursor(4),
      });
      expect(c).toMatchSnapshot();
    });
  });

  describe('cursor edge cases', () => {
    it('throws an error if first < 0', () => {
      expect(() => {
        connectionFromArray(letters, { first: -1 });
      }).toThrow('Argument "first" must be a non-negative integer');
    });

    it('throws an error if last < 0', () => {
      expect(() => {
        connectionFromArray(letters, { last: -1 });
      }).toThrow('Argument "last" must be a non-negative integer');
    });

    it('returns all elements if cursors are invalid', () => {
      const c = connectionFromArray(letters, {
        before: 'invalid',
        after: 'invalid',
      });
      expect(c).toMatchSnapshot();
    });

    it('returns all elements if cursors are on the outside', () => {
      const c = connectionFromArray(letters, {
        before: offsetToCursor(6),
        after: offsetToCursor(-1),
      });
      expect(c).toMatchSnapshot();
    });

    it('returns no elements if cursors cross', () => {
      const c = connectionFromArray(letters, {
        before: offsetToCursor(2),
        after: offsetToCursor(4),
      });
      expect(c).toMatchSnapshot();
    });
  });
});

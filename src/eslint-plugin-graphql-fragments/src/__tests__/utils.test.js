// @flow

const fs = require('fs');
const path = require('path');
const { parse } = require('graphql');

const utils = require('../utils');

function getExpression(name) {
  const expression = fs.readFileSync(
    path.resolve(__dirname, `../__fixtures__/${name}.graphql`),
    'utf8',
  );

  return parse(expression);
}

describe('Utils', () => {
  describe('calculateComplexity', () => {
    it('calculate score of graphql expression', () => {
      // FRAGMENTS
      expect(utils.calculateComplexity(getExpression('DestinationFragment'))).toBe(3);
      expect(utils.calculateComplexity(getExpression('FAQArticleFragment'))).toBe(4);
      // score: 16 fields + 2 fragment spreads + 8 for objects
      expect(utils.calculateComplexity(getExpression('AccordionFragment'))).toBe(26);

      // QUERIES
      // score: 8 query + 9 fields + 2 object field & inline fragment
      expect(utils.calculateComplexity(getExpression('GetLocationQuery'))).toBe(19);
    });
  });
});

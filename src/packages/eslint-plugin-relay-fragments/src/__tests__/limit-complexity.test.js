// @flow

const fs = require('fs');
const path = require('path');
const RuleTester = require('eslint').RuleTester;

const plugin = require('../../');

function loadFile(filename) {
  return fs.readFileSync(path.resolve(__dirname, `../__fixtures__/${filename}.graphql`), 'utf8');
}

// Valid fragments
const FAQArticleFragment = loadFile('FAQArticleFragment');
const GetLocationQuery = loadFile('GetLocationQuery');

// Too complex fragments
const AccordionFragment = loadFile('AccordionFragment');

const ruleTester = new RuleTester({
  parser: require.resolve('babel-eslint'),
});

ruleTester.run('expression-is-not-complex', plugin.rules['limit-complexity'], {
  valid: [
    `graphql\`${FAQArticleFragment}\``,
    `graphql\`${GetLocationQuery}\``,
    { code: `graphql\`${AccordionFragment}\``, options: [{ threshold: 30 }] },
  ],
  invalid: [
    {
      code: `graphql\`${AccordionFragment}\``,
      errors: [
        { message: 'Your GraphQL expression exceeded the limit. Your score: 26, Limit: 20.' },
      ],
    },
  ],
});

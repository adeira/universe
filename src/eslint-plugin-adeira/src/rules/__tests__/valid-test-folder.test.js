// @flow

const RuleTester = require('eslint').RuleTester;

const rule = require('../valid-test-folder');

const ruleTester = new RuleTester({
  parser: require.resolve('babel-eslint'),
});

ruleTester.run('valid-test-folder', rule, {
  valid: [
    {
      code: "it('works', () => {expect(true).toBe(true)})",
      filename: '/__tests__/Module.test.js',
    },
    {
      code: "it('works', () => {expect(true).toBe(true)})",
      filename: '/__tests__/Module.spec.js',
    },
    {
      code: "it('works', () => {expect(true).toBe(true)})",
      filename: 'src/packages/test/__tests__/Module.spec.js',
    },
    {
      // not a test
      code: "console.log('hey')",
      filename: '/path/Module.js',
    },
  ],

  invalid: [
    {
      code: "it('works', () => {expect(true).toBe(true)})",
      filename: '/__test__/Module.test.js',
      errors: [{ message: 'Expect test to be in a folder called __tests__' }],
    },
    {
      code: "it('works', () => {expect(true).toBe(true)})",
      filename: 'src/__test__/Module.spec.js',
      errors: [{ message: 'Expect test to be in a folder called __tests__' }],
    },
  ],
});

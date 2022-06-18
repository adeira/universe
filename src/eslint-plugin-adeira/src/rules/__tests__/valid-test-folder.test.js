// @flow

const RuleTester = require('eslint').RuleTester;

const rule = require('../valid-test-folder');

const ruleTester = new RuleTester({
  parser: require.resolve('hermes-eslint'),
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
      code: "it('works', () => {expect(true).toBe(true)})",
      filename: 'src/packages/test/__tests__/Module.custom.jsx',
      settings: { isTestRegex: '.custom.jsx$' },
    },
    {
      // not a test
      code: "console.log('hey')",
      filename: '/path/Module.js',
    },
    {
      code: '',
      filename: '/path/__flowtests__/Styles.flowtest.js',
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
    {
      code: "it('works', () => {expect(true).toBe(true)})",
      filename: 'src/packages/test/__tests__/Module.lol.js',
      settings: { isTestRegex: '.lol.js$', validTestFolderRegex: '__lol__' },
      errors: [{ message: 'Expect test to be in a folder called __lol__' }],
    },
  ],
});

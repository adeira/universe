// @flow

const RuleTester = require('eslint').RuleTester;

const rule = require('../no-exact-indexer');

const ruleTester = new RuleTester({
  parser: require.resolve('babel-eslint'),
});

const errors = ['Exact type cannot have indexer property.'];

ruleTester.run('no-exact-indexer', rule, {
  valid: [
    'type X = {}',
    'type X = { ... }',
    'type X = { a: string, ... }',
    'type X = { a: string, [string]: number, ... }',
    'type X = { [string]: number, ... }',
    'type X = { [number]: string, [string]: number, ... }',
    'type X = {||}',
    'type X = {| a: number |}',
  ],

  // TODO: should we also take into account `$Exact`?
  invalid: [
    { code: 'type X = {| +[key: string]: number |}', errors },
    { code: 'type X = {| a: number, +[key: string]: string |}', errors },
    { code: 'type X = {| a: number, +[key: string]: string, [number]: number |}', errors },

    // Variants for 'exact_by_default=true':
    { code: 'type X = { +[key: string]: number }', errors },
  ],
});

// @flow

const RuleTester = require('eslint').RuleTester;

const rule = require('../no-duplicate-import-type-import');

const ruleTester = new RuleTester({
  parser: require.resolve('babel-eslint'),
});

ruleTester.run('no-duplicate-import', rule, {
  valid: [
    {
      code: 'import Foo, { type Bar } from "foo";',
    },
    {
      code: `import Foo, { type FooLol } from 'foo';
    import Bar, { type BarLol} from 'bar';
    import Lol from 'lol';`,
    },
    {
      // These are handled by imports/no-duplicate
      code: `import { Foo } from 'foo';
      import { Bar } from 'foo';`,
    },
    {
      code: `import type { Foo } from 'foo'
    import type { Bar } from 'foo'`,
    },
  ],

  invalid: [
    {
      code: `import Foo from 'Foo';
      import type { Bar } from 'Foo'`,
      errors: ['Found duplicate import/type import Foo'],
    },
    {
      code: `import React, { type Node } from 'react';
      import type { Component } from 'react';`,
      errors: ['Found duplicate import/type import react'],
    },
    {
      code: `import React from 'react';
      import type { Node } from 'react';
      import { graphql, type Environment } from '@adeira/relay';
      import type { RelayRefetchProps } from '@adeira/relay';`,
      errors: [
        'Found duplicate import/type import react',
        'Found duplicate import/type import @adeira/relay',
      ],
    },
  ],
});

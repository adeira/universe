// @flow

const RuleTester = require('eslint').RuleTester;

const rule = require('../no-duplicate-import-type-import');

const ruleTester = new RuleTester({
  parser: require.resolve('@babel/eslint-parser'),
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
    {
      // https://github.com/adeira/universe/issues/3410
      code: `import '@material/mwc-button';
import '@material/mwc-dialog';
import '@material/mwc-drawer';
import '@material/mwc-icon-button';
import '@material/mwc-list';
import '@material/mwc-menu';
import './WebComponents/TopAppBar';
import './WebComponents/MaterialDrawer';
import type {Dialog} from "@material/mwc-dialog";`,
    },
  ],

  invalid: [
    {
      code: `import Foo from 'Foo';
      import type { Bar } from 'Foo'`,
      errors: ['Found duplicate import/type import Foo'],
      output: `import Foo, { type Bar } from 'Foo';
      `,
    },
    {
      code: `import React, { type Node } from 'react';
      import type { Component } from 'react';`,
      errors: ['Found duplicate import/type import react'],
      output: `import React, { type Node, type Component } from 'react';
      `,
    },
    {
      code: `import React from 'react';import type { Node } from 'react';import { graphql, type Environment } from '@adeira/relay';import type { RelayRefetchProps } from '@adeira/relay';`,
      errors: [
        'Found duplicate import/type import react',
        'Found duplicate import/type import @adeira/relay',
      ],
      output: `import React, { type Node } from 'react';import { graphql, type Environment, type RelayRefetchProps } from '@adeira/relay';`,
    },
    {
      code: `import type { Node } from 'react';import React from 'react';`,
      errors: ['Found duplicate import/type import react'],
      output: `import React, { type Node } from 'react';`,
    },
  ],
});

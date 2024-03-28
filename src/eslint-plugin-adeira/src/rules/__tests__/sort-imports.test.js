// @flow

const RuleTester = require('eslint').RuleTester;

const rule = require('../sort-imports');

const ruleTester = new RuleTester({
  parser: require.resolve('hermes-eslint'),
});

ruleTester.run('sort-imports', rule, {
  valid: [
    `
      import a from 'a.js';
      import b from 'b.js';
      import c from 'c.js';
    `,
    `import { A, B } from 'x.js';`,
    `import { A as C, B } from 'x.js';`,
    `import { type A, type B } from 'x.js';`,
    `import type { A, B } from 'x.js';`,
    `import * as React from 'react';`,
    `import React, { Component } from 'react';`,
    `import { createEnvironment, createNetworkFetcher, RelayEnvironmentProvider } from '@adeira/relay';`,

    // TODO: the following examples are incorrect but currently not implemented
    `import { type A, B } from 'x.js';`,
    `import { useContext, type Node, useRef } from 'react';`,
    `
      import c from 'c.js';
      import b from 'b.js';
      import a from 'a.js';
    `,
  ],
  invalid: [
    // sortImportsAlphabetically
    {
      code: `import { B, A } from 'x.js';`,
      output: `import { A, B } from 'x.js';`,
      errors: [
        {
          messageId: 'sortImportsAlphabetically',
          data: {
            firstUnsortedImport: 'A',
            beforeFirstUnsortedImport: 'B',
          },
        },
      ],
    },
    {
      code: `import type { B, A } from 'x.js';`,
      output: `import type { A, B } from 'x.js';`,
      errors: [
        {
          messageId: 'sortImportsAlphabetically',
          data: {
            firstUnsortedImport: 'A',
            beforeFirstUnsortedImport: 'B',
          },
        },
      ],
    },

    // sortTypeImportsAlphabetically
    {
      code: `import { type B, type A } from 'x.js';`,
      output: `import { type A, type B } from 'x.js';`,
      errors: [
        {
          messageId: 'sortTypeImportsAlphabetically',
          data: {
            firstUnsortedImport: 'A',
            beforeFirstUnsortedImport: 'B',
          },
        },
      ],
    },
    {
      code: `
        import {
          Environment as RelayEnvironment,
          Network,
          type OperationLoader,
          type LogFunction,
          type Environment,
        } from 'relay-runtime';
      `,
      output: `
        import {
          Environment as RelayEnvironment,
          Network,
          type Environment,
          type LogFunction,
          type OperationLoader,
        } from 'relay-runtime';
      `,
      errors: [
        {
          messageId: 'sortTypeImportsAlphabetically',
          data: {
            firstUnsortedImport: 'LogFunction',
            beforeFirstUnsortedImport: 'OperationLoader',
          },
        },
      ],
    },
    {
      code: `import { /* comment */ type B, type A } from 'x.js';`,
      output: null, // not fixed due to comment
      errors: [
        {
          messageId: 'sortTypeImportsAlphabetically',
          data: {
            firstUnsortedImport: 'A',
            beforeFirstUnsortedImport: 'B',
          },
        },
      ],
    },
    {
      code: `import { type B /* comment */, type A } from 'x.js';`,
      output: null, // not fixed due to comment
      errors: [
        {
          messageId: 'sortTypeImportsAlphabetically',
          data: {
            firstUnsortedImport: 'A',
            beforeFirstUnsortedImport: 'B',
          },
        },
      ],
    },
    {
      code: `import { type B, /* comment */ type A } from 'x.js';`,
      output: null, // not fixed due to comment
      errors: [
        {
          messageId: 'sortTypeImportsAlphabetically',
          data: {
            firstUnsortedImport: 'A',
            beforeFirstUnsortedImport: 'B',
          },
        },
      ],
    },
    {
      code: `import { type B, type A /* comment */ } from 'x.js';`,
      output: null, // not fixed due to comment
      errors: [
        {
          messageId: 'sortTypeImportsAlphabetically',
          data: {
            firstUnsortedImport: 'A',
            beforeFirstUnsortedImport: 'B',
          },
        },
      ],
    },
  ],
});

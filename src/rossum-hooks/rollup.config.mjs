// @flow

import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

import flow from './rollup-plugin-flow.mjs';

/*::

import type { RollupPlugin } from './rollup-plugin-flow.mjs';

*/

export default [
  {
    input: 'src/string-manipulations/index.js',
    output: {
      file: 'build/rossum-string-manipulations.js',
      format: 'cjs',
    },
    plugins: ([flow()] /*: $ReadOnlyArray<RollupPlugin> */),
  },
  {
    input: 'src/sync-queues/index.js',
    output: {
      file: 'build/rossum-sync-queues.js',
      format: 'cjs',
    },
    plugins: ([flow()] /*: $ReadOnlyArray<RollupPlugin> */),
    external: ['https', 'url'],
  },
  {
    input: 'src/sheets/handlers/awsLambda.js',
    output: {
      file: 'build/rossum-sheets-aws.js',
      format: 'cjs',
    },
    plugins: ([flow(), commonjs(), nodeResolve()] /*: $ReadOnlyArray<RollupPlugin> */),
  },
  {
    input: 'src/sheets/handlers/digitalOceanFunction.js',
    output: {
      file: 'build/rossum-sheets-digitalocean.js',
      format: 'cjs',
    },
    plugins: ([flow(), commonjs(), nodeResolve()] /*: $ReadOnlyArray<RollupPlugin> */),
  },
  {
    input: 'src/sheets/handlers/rossumServerlessFunction.js',
    output: {
      file: 'build/rossum-sheets-rossum.js',
      format: 'cjs',
    },
    plugins: ([flow(), commonjs(), nodeResolve()] /*: $ReadOnlyArray<RollupPlugin> */),
  },
];

// @flow

import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

import flow from './rollup-plugin-flow.mjs';

/*::

import type { RollupPlugin } from './rollup-plugin-flow.mjs';

*/

export default [
  {
    input: 'src/handlers/awsLambda.js',
    output: {
      file: 'build/rossum-sheets-aws.js',
      format: 'cjs',
    },
    plugins: ([flow(), commonjs(), nodeResolve()] /*: $ReadOnlyArray<RollupPlugin> */),
  },
  {
    input: 'src/handlers/digitalOceanFunction.js',
    output: {
      file: 'build/rossum-sheets-digitalocean.js',
      format: 'cjs',
    },
    plugins: ([flow(), commonjs(), nodeResolve()] /*: $ReadOnlyArray<RollupPlugin> */),
  },
  {
    input: 'src/handlers/rossumServerlessFunction.js',
    output: {
      file: 'build/rossum-sheets-rossum.js',
      format: 'cjs',
    },
    plugins: ([flow(), commonjs(), nodeResolve()] /*: $ReadOnlyArray<RollupPlugin> */),
  },
];

// @flow

import flow from './rollup-plugin-flow.mjs';

/*::

import type { RollupPlugin } from './rollup-plugin-flow.mjs';

*/

export default [
  {
    input: 'src/string-manipulations/index.js',
    output: {
      file: 'build/string-manipulations.js',
      format: 'cjs',
    },
    plugins: ([flow()] /*: $ReadOnlyArray<RollupPlugin> */),
  },
  {
    input: 'src/sync-queues/index.js',
    output: {
      file: 'build/sync-queues.js',
      format: 'cjs',
    },
    plugins: ([flow()] /*: $ReadOnlyArray<RollupPlugin> */),
    external: ['https', 'url'],
  },
];

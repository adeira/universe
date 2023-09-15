// @flow

import prettier from 'rollup-plugin-prettier';
import nodeResolve from '@rollup/plugin-node-resolve';

import flow from './rollup-plugin-flow.mjs';

/*::

import type { RollupPlugin } from './rollup-plugin-flow.mjs';

*/

const bannerMessage =
  '/* Generated content - contact Martin Zlámal (martin.zlamal@rossum.ai) for more info */';

const plugins = ([
  flow(),
  nodeResolve(),
  prettier({ parser: 'flow' }),
] /*: $ReadOnlyArray<RollupPlugin> */);

const outputOptions = {
  format: 'cjs',
  banner: bannerMessage,
  footer: bannerMessage,
};

export default [
  {
    input: 'src/netsuite/line-item-update-button/index.js',
    output: {
      ...outputOptions,
      file: 'build/netsuite-line-item-update-button.js',
    },
    plugins,
    external: ['https'],
  },
  {
    input: 'src/netsuite/manual-export-button/index.js',
    output: {
      ...outputOptions,
      file: 'build/netsuite-manual-export-button.js',
    },
    plugins,
    external: ['https'],
  },
  {
    input: 'src/string-manipulations/index.js',
    output: {
      ...outputOptions,
      file: 'build/string-manipulations.js',
    },
    plugins,
  },
  {
    input: 'src/sync-queues/index.js',
    output: {
      ...outputOptions,
      file: 'build/sync-queues.js',
    },
    plugins,
    external: ['https'],
  },
];

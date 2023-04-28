// @flow

import { createFilter } from '@rollup/pluginutils';
import flowRemoveTypes from 'flow-remove-types';

/*::

type FilterPattern = $ReadOnlyArray<string | RegExp> | string | RegExp | null;
type RollupPluginOptions = {
  +include?: FilterPattern,
  +exclude?: FilterPattern,
};
export type RollupPlugin = {
  name: string,
  transform: (code: string, id: string) => ?{ +code: string, +map: string },
};

*/

// TODO: extract to NPM package instead of legacy https://github.com/leebyron/rollup-plugin-flow
export default function transformCodePlugin(
  options /*: RollupPluginOptions */ = {},
) /*: RollupPlugin */ {
  const filter = createFilter(options.include, options.exclude);

  return {
    name: 'transform-code',
    transform(code, id) {
      if (!filter(id)) {
        return;
      }

      const output = flowRemoveTypes(code, {
        pretty: true,
      });

      // eslint-disable-next-line consistent-return
      return {
        code: output.toString(),
        map: output.generateMap(),
      };
    },
  };
}

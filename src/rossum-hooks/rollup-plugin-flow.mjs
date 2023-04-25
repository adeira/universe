import { createFilter } from '@rollup/pluginutils';
import flowRemoveTypes from 'flow-remove-types';

// TODO: extract to NPM package instead of legacy https://github.com/leebyron/rollup-plugin-flow
export default function transformCodePlugin(options = {}) {
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

      return {
        code: output.toString(),
        map: output.generateMap(),
      };
    },
  };
}

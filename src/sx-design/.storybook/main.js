// @flow

import { join, dirname } from 'path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value /*: string */) {
  return dirname(require.resolve(join(value, 'package.json')));
}

const config = {
  stories: ['../src/**/*.stories.js'],
  addons: [
    getAbsolutePath('@storybook/addon-webpack5-compiler-babel'),
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-webpack5'),
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  babel: (options /*: $FlowFixMe */) => {
    return {
      ...options,
      presets: ['@adeira/babel-preset-adeira'],
      plugins: ['babel-plugin-fbt', 'babel-plugin-fbt-runtime'],
    };
  },
};

export default (config /*: $FlowFixMe */);

import { join, dirname } from 'path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')));
}

/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ['../src/**/*.stories.js'], // TODO: change to search
  // stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-webpack5-compiler-babel'),
    getAbsolutePath('@storybook/addon-onboarding'), // TODO: remove
    getAbsolutePath('@storybook/addon-links'), // TODO: ??
    getAbsolutePath('@storybook/addon-essentials'), // TODO: ??
    getAbsolutePath('@chromatic-com/storybook'), // TODO: remove
    getAbsolutePath('@storybook/addon-interactions'), // TODO: ??
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-webpack5'),
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  babel: (options) => {
    return {
      ...options,
      presets: [['@adeira/babel-preset-adeira']],
    };
  },
};
export default config;

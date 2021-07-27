// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'sx-tailwind-website.js'), [
  [
    'src/sx-tailwind-website/__github__/.github/workflows/continuous-integration.yml',
    '.github/workflows/continuous-integration.yml',
  ],
  ['src/sx-tailwind-website/__github__/.flowconfig', '.flowconfig'],
  ['src/sx-tailwind-website/__github__/babel.config.js', 'babel.config.js'],
  ['src/sx-tailwind-website/__github__/flow-typed/globals.js', 'flow-typed/globals.js'],
  ['src/sx-tailwind-website/src/components/Code.js', 'src/components/Code.js'],
  ['src/sx-tailwind-website/src/pages/index.js', 'src/pages/index.js'],
  ['src/sx-tailwind-website/package.json', 'package.json'],

  // invalid cases:
  ['src/sx-tailwind-website/.babelrc.js', undefined], // correctly deleted
  ['src/sx-tailwind-website/__github__/unknown.js', undefined], // correctly deleted
  ['src/sx-tailwind-website/next.config.js', undefined], // correctly deleted
  ['src/packages/monorepo/outsideScope.js', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);

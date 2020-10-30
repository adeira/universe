// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'sx-tailwind-website.js'), [
  ['src/sx-tailwind-website/package.json', 'package.json'],
  ['src/sx-tailwind-website/pages/index.js', 'pages/index.js'],
  ['src/sx-tailwind-website/Documentation/index.js', 'Documentation/index.js'],
  ['src/sx-tailwind-website/__github__/.flowconfig', '.flowconfig'],
  ['src/sx-tailwind-website/__github__/.babelrc.js', '.babelrc.js'],
  ['src/sx-tailwind-website/__github__/flow-typed/globals.js', 'flow-typed/globals.js'],
  [
    'src/sx-tailwind-website/__github__/.github/workflows/continuous-integration.yml',
    '.github/workflows/continuous-integration.yml',
  ],

  // invalid cases:
  ['src/sx-tailwind-website/next.config.js', undefined], // correctly deleted
  ['src/sx-tailwind-website/__github__/unknown.js', undefined], // correctly deleted
  ['src/sx-tailwind-website/BUILD.bazel', undefined], // correctly deleted
  ['src/sx-tailwind-website/BUILD', undefined], // correctly deleted
  ['src/sx-tailwind-website/WORKSPACE.bazel', undefined], // correctly deleted
  ['src/sx-tailwind-website/WORKSPACE', undefined], // correctly deleted
  ['src/packages/monorepo/outsideScope.js', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);

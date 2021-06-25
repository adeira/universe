// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'sx-tailwind.js'), [
  ['src/sx-tailwind/src/__tests__/tailwind.test.js', 'src/__tests__/tailwind.test.js'],
  ['src/sx-tailwind/package.json', 'package.json'],

  // invalid cases:
  ['src/sx-tailwind/BUILD', undefined], // correctly deleted
  ['src/sx-tailwind/BUILD.bazel', undefined], // correctly deleted
  ['src/sx-tailwind/WORKSPACE', undefined], // correctly deleted
  ['src/sx-tailwind/WORKSPACE.bazel', undefined], // correctly deleted
  ['src/packages/monorepo/outsideScope.js', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);

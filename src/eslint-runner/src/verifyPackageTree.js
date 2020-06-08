// @flow strict

const fs = require('fs');
const path = require('path');

/**
 * Inspiration: https://github.com/facebook/create-react-app/blob/3495286f8f3835d55cbdedbc881ae481eb0a3c65/packages/react-scripts/scripts/utils/verifyPackageTree.js
 * MIT licenced.
 */
module.exports = function verifyPackageTree() {
  // $FlowAllowDynamicImport
  const ownPackageJson = require('../package.json');
  const depsToCheck = Object.keys(ownPackageJson.dependencies).filter(dep =>
    dep.startsWith('eslint-plugin'),
  );

  const expectedVersionsByDep = {};
  depsToCheck.forEach(dep => {
    expectedVersionsByDep[dep] = ownPackageJson.dependencies[dep].replace(/^[~^]/, '');
  });

  // Verify we don't have other versions up the tree.
  let currentDir = __dirname;
  while (true) {
    const previousDir = currentDir;
    currentDir = path.resolve(currentDir, '..');
    if (currentDir === previousDir) {
      break; // We've reached the root.
    }
    const maybeNodeModules = path.resolve(currentDir, 'node_modules');
    if (!fs.existsSync(maybeNodeModules)) {
      continue;
    }
    depsToCheck.forEach(dep => {
      const maybeDep = path.resolve(maybeNodeModules, dep);
      if (!fs.existsSync(maybeDep)) {
        return;
      }
      const maybeDepPackageJson = path.resolve(maybeDep, 'package.json');
      if (!fs.existsSync(maybeDepPackageJson)) {
        return;
      }
      const depPackageJson = JSON.parse(fs.readFileSync(maybeDepPackageJson, 'utf8'));
      const expectedVersion = expectedVersionsByDep[dep];
      if (depPackageJson.version !== expectedVersion) {
        console.warn(
          'There might be a problem with the following plugin: %s (used %s but expected %s)',
          dep,
          depPackageJson.version,
          expectedVersion,
        );
      }
    });
  }
};

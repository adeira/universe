// @flow

import { ShellCommand, findMonorepoRoot } from '@adeira/monorepo-utils';
import path from 'path';
import deepEqual from 'deep-equal';

type KeyValue = {
  [key: string]: string,
  ...,
};
type PackageJson = {
  dependencies?: KeyValue,
  devDependencies?: KeyValue,
  peerDependencies?: KeyValue,
  eslintConfig?: KeyValue,
  ...
};

const getDependencies = (packageJson: PackageJson) => {
  const set = new Set();
  const dependencyKeys = ['dependencies', 'devDependencies', 'peerDependencies'];
  for (const key of dependencyKeys) {
    if (packageJson[key] != null) {
      for (const dependency of Object.keys(packageJson[key])) {
        set.add(dependency);
      }
    }
  }
  return set;
};

function diffDependencies(filename: string): boolean {
  try {
    const headFile = JSON.parse(
      new ShellCommand(findMonorepoRoot(), 'git', 'show', `master:${filename}`)
        .runSynchronously()
        .getStdout(),
    );
    const headFileDependencies = Array.from(getDependencies(headFile));

    // $FlowAllowDynamicImport
    const currentBranchFile = require(path.join(findMonorepoRoot(), filename));
    const currentBranchDependencies = Array.from(getDependencies(currentBranchFile));
    let eslintConfigChanged = false;

    if (currentBranchFile.eslintConfig != null) {
      eslintConfigChanged = !deepEqual(headFile.eslintConfig, currentBranchFile.eslintConfig);
    }

    // We only need to lint all if a dependency is removed or eslintConfig field is changed
    return (
      headFileDependencies.some(dependency => !currentBranchDependencies.includes(dependency)) ||
      eslintConfigChanged
    );
  } catch {
    // Return fallback true in case something should fail, file is not in head etc.
    return true;
  }
}

// This function is being called multiple times pr file per run, so lets cache the files
const shouldLintAllCache = new Map<string, boolean>();
const { NODE_ENV } = process.env;

export default function shouldLintAll(filename: string): boolean {
  if (shouldLintAllCache.has(filename) && NODE_ENV !== 'test') {
    // $FlowExpectedError: We know this key exists, but flow does not
    return shouldLintAllCache.get(filename);
  }

  if (/package\.json$/.test(filename)) {
    const lintAll = diffDependencies(filename);
    shouldLintAllCache.set(filename, lintAll);
    return lintAll;
  }
  // Eslint configs can be nested (not only the root path).
  // See: https://eslint.org/docs/user-guide/configuring#configuration-file-formats
  const lintAll = /\.eslintrc(?:\.(?:js(?:on)?|ya?ml))?$|^\.eslintignore$/.test(filename);
  shouldLintAllCache.set(filename, lintAll);
  return lintAll;
}

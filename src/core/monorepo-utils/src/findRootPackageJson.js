// @flow strict

import fs from 'fs';
import path from 'path';

let MEMOIZED_PATH = null;

type AnyNestedObject = { +[string]: AnyNestedObject, ... };
type PackageJSON = {
  +workspaces?:
    | $ReadOnlyArray<string>
    | {| +packages: $ReadOnlyArray<string>, +nohoist: $ReadOnlyArray<string> |},
  +[string]: AnyNestedObject,
  ...
};

/**
 * It tries to find root package.json recursively starting from the
 * provided path. It expects monorepo setup (defined workspaces). It
 * also memoizes the computed path and returns it immediately with
 * the second call.
 */
export function findRootPackageJson(directory: string = __dirname): PackageJSON {
  const packageJsonPath = findRootPackageJsonPath(directory);
  // $FlowAllowDynamicImport
  return require(packageJsonPath);
}

export function findMonorepoRoot(directory: string = __dirname): string {
  return path.dirname(findRootPackageJsonPath(directory));
}

export function findRootPackageJsonPath(directory: string = __dirname): string {
  if (MEMOIZED_PATH !== null) {
    return MEMOIZED_PATH;
  }

  if (directory === '/') {
    throw new Error('Unable to find root package.json file.');
  }

  const packageJSONPath = path.join(directory, 'package.json');

  try {
    fs.accessSync(packageJSONPath, fs.constants.F_OK);
    // $FlowAllowDynamicImport
    const packageJSON = require(packageJSONPath);
    if (!packageJSON.workspaces) {
      // not a root package.json
      return findRootPackageJsonPath(path.dirname(directory));
    }
    MEMOIZED_PATH = packageJSONPath;
    return packageJSONPath;
  } catch (err) {
    // package.json doesn't exist here
    return findRootPackageJsonPath(path.dirname(directory));
  }
}

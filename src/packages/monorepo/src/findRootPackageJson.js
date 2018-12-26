// @flow

import fs from 'fs';
import path from 'path';

let MEMOIZED_PATH = null;

/**
 * It tries to find root package.json recursively starting from the
 * provided path. It expects monorepo setup (defined workspaces). It
 * also memoizes the computed path and returns it immediately with
 * the second call.
 */
export default function findRootPackageJson(directory: string = __dirname) {
  if (MEMOIZED_PATH !== null) {
    // $FlowAllowDynamicImport
    return require(MEMOIZED_PATH);
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
      return findRootPackageJson(path.dirname(directory));
    }
    MEMOIZED_PATH = packageJSONPath;
    return packageJSON;
  } catch (err) {
    // package.json doesn't exist here
    return findRootPackageJson(path.dirname(directory));
  }
}

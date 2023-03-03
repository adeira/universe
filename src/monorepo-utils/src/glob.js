// @flow

import { glob as _glob, globSync as _globSync } from 'glob';
import { invariant, isObject } from '@adeira/js';

type GlobPattern = string;

type GlobOptions = $ReadOnly<{
  cwd?: string,
  root?: string,
  dot?: boolean,
  nomount?: boolean,
  mark?: boolean,
  nosort?: boolean,
  stat?: boolean,
  silent?: boolean,
  strict?: boolean,
  cache?: { [path: string]: boolean | 'DIR' | 'FILE' | $ReadOnlyArray<string> },
  statCache?: { [path: string]: false | { isDirectory(): boolean } | void },
  symlinks?: { [path: string]: boolean | void },
  realpathCache?: { [path: string]: string },
  sync?: boolean,
  nounique?: boolean,
  nonull?: boolean,
  debug?: boolean,
  nobrace?: boolean,
  noglobstar?: boolean,
  noext?: boolean,
  nocase?: boolean,
  matchBase?: any,
  nodir?: boolean,
  ignore?: string | $ReadOnlyArray<string>,
  follow?: boolean,
  realpath?: boolean,
  nonegate?: boolean,
  nocomment?: boolean,
  absolute?: boolean,
}>;

function isWindowsPath(globPattern: GlobPattern): boolean %checks {
  return /^[a-z]:\\/i.test(globPattern);
}

function isValidRoot(globPattern: GlobPattern, options?: GlobOptions): boolean %checks {
  return !(globPattern.startsWith('/') && options?.root === undefined);
}

function validateInputs(globPattern: GlobPattern, options?: GlobOptions): void {
  // Only forward slashes must be used, but we cannot disallow backslash since
  // escaping is still allowed. See: https://github.com/isaacs/node-glob#windows
  invariant(
    !isWindowsPath(globPattern),
    `Your glob patterns looks like absolute Windows path but this is not allowed. Glob doesn't accept paths but glob patterns instead. Invalid pattern: ${globPattern}`,
  );

  invariant(
    isValidRoot(globPattern, options),
    `Your glob pattern starts from root but you didn't define any root in glob options. Invalid pattern: ${globPattern}`,
  );
}

export function glob(
  globPattern: GlobPattern,
  options?: GlobOptions,
): Promise<$ReadOnlyArray<string>> {
  validateInputs(globPattern, isObject(options) ? options : undefined);

  return _glob(globPattern, {
    ignore: ['**/node_modules/**'],
    ...options,
  });
}

export function globSync(globPattern: GlobPattern, options?: GlobOptions): $ReadOnlyArray<string> {
  validateInputs(globPattern, options);

  return _globSync(globPattern, {
    ignore: ['**/node_modules/**'],
    ...options,
  });
}

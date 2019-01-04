// @flow

import execa from 'execa';

export default function git(options: $ReadOnlyArray<string>) {
  return execa.sync('git', ['--no-pager', ...options], { stdio: 'inherit' });
}

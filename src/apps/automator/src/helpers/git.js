// @flow

import { exec, type ExecConfig } from './exec';

export default function git(
  options: $ReadOnlyArray<string>,
  config?: ExecConfig,
) {
  return exec('git', ['--no-pager', ...options], config);
}

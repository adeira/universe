// @flow

import { exec, type ExecConfig } from './exec';

export default async function git(
  options: $ReadOnlyArray<string>,
  config?: ExecConfig,
) {
  return exec('git', ['--no-pager', ...options], config);
}

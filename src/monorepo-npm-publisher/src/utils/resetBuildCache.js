// @flow

import { rimraf } from 'rimraf';

export async function resetBuildCache(buildCachePath: string): Promise<void> {
  await rimraf(buildCachePath);
}

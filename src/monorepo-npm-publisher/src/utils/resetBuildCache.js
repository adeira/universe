// @flow

import rimraf from 'rimraf';
import util from 'util';

export async function resetBuildCache(buildCachePath: string): Promise<void> {
  await util.promisify(rimraf)(buildCachePath);
}

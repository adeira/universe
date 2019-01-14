// @flow

import path from 'path';
import publish from '@kiwicom/npm-publisher';

import paths from '../paths';

publish({
  babelConfigFile: path.resolve(__dirname, '..', 'babel.config.js'),
  buildCache: paths.buildCache,
  packages: path.join(__dirname, '..', 'src', 'packages'),
  dryRun: false,
});

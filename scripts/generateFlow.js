// @flow

import fs from 'fs';
import path from 'path';
import { merge } from '@adeira/flow-config-parser';
import SignedSource from '@adeira/signed-source';

// yarn monorepo-babel-node scripts/generateFlow.js

const mergedConfig = merge(
  fs.readFileSync(path.join(__dirname, '..', '.flowconfig.base'), 'utf8'),
  fs.readFileSync(path.join(__dirname, '..', '.flowconfig.ios'), 'utf8'),
);

// TODO: generate and run Flow even for Android part
// TODO: collect and merge .flowconfig(s) from all around the monorepo

const template = SignedSource.signFile(`# ${SignedSource.getSigningToken()}
#
# To regenerate run:
# yarn monorepo-babel-node scripts/generateFlow.js
#
${mergedConfig}
`);

fs.writeFileSync(path.join(__dirname, '..', '.flowconfig'), template);

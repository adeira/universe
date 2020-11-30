// @flow

import fs from 'fs';
import path from 'path';
import { merge } from '@adeira/flow-config-parser';
import SignedSource from '@adeira/signed-source';

// yarn monorepo-babel-node scripts/generateFlow.js

const mergedIOSConfig = merge(
  fs.readFileSync(path.join(__dirname, '..', '.flowconfig.template.base'), 'utf8'),
  fs.readFileSync(path.join(__dirname, '..', '.flowconfig.template.ios'), 'utf8'),
);

const mergedAndroidConfig = merge(
  fs.readFileSync(path.join(__dirname, '..', '.flowconfig.template.base'), 'utf8'),
  fs.readFileSync(path.join(__dirname, '..', '.flowconfig.template.android'), 'utf8'),
);

// TODO: collect and merge .flowconfig(s) from all around the monorepo

function getFlowconfigTemplate(config: string): string {
  return SignedSource.signFile(`# ${SignedSource.getSigningToken()}
#
# To regenerate run:
# yarn monorepo-babel-node scripts/generateFlow.js
#
${config}
`);
}

fs.writeFileSync(
  path.join(__dirname, '..', '.flowconfig.ios'),
  getFlowconfigTemplate(mergedIOSConfig),
);

fs.writeFileSync(
  path.join(__dirname, '..', '.flowconfig.android'),
  getFlowconfigTemplate(mergedAndroidConfig),
);

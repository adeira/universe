// @flow

import fs from 'fs';
import path from 'path';
import { merge } from '@adeira/flow-config-parser';
import SignedSource from '@adeira/signed-source';

// yarn monorepo-babel-node scripts/generateFlow.js

const mergedConfig = merge(
  fs.readFileSync(path.join(__dirname, '..', '.flowconfig.template.base'), 'utf8'),
  '', // custom config which can be merged with the base template
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
  // for convenience we generate the IOS config without `*.ios` so Flow
  // can find the config automatically (without specifying --flowconfig-name)
  path.join(__dirname, '..', '.flowconfig'),
  getFlowconfigTemplate(mergedConfig),
);

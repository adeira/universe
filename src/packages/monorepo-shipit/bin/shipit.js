#!/usr/bin/env node

// @flow strict-local

import os from 'os';
import fs from 'fs';
import path from 'path';

import PhaseRunner from '../src/PhaseRunner';
import OSSPackages from '../../../open-source';

// TODO: fail on errors (see: https://gitlab.skypicker.com/incubator/universe/-/jobs/4646614)

for (const config of OSSPackages.values()) {
  // TODO: we could (should) eventually keep the temp directory, cache it and just update it
  const tmpdir = fs.mkdtempSync(path.join(os.tmpdir(), 'kiwicom-shipit-'));

  new PhaseRunner({
    sourceURL: config.sourceURL,
    directoryMapping: config.directoryMapping,
    destinationPath: tmpdir,
  }).run();
}

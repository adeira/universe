// @flow

import os from 'os';
import fs from 'fs';
import path from 'path';
import {
  glob,
  Workspaces,
  findRootPackageJsonPath,
} from '@kiwicom/monorepo-utils';

import replaceAutomatorTags from '../helpers/replaceAutomatorTags';
import commitAllAndOpenMR from '../helpers/gitlab/commitAllAndOpenMR';
import log from '../log';

const COMMIT_MESSAGE = 'Docs: update NPM packages list';

export default function run(taskIdentifier: string) {
  updateNPMPackagesInfo(taskIdentifier, async () => {
    await commitAllAndOpenMR(taskIdentifier, COMMIT_MESSAGE);
  });
}

function updateNPMPackagesInfo(
  taskIdentifier: string,
  cb: () => Promise<void>,
): void {
  const workspaces = new Set();

  Workspaces.iterateWorkspaces(packageJSONLocation => {
    // $FlowAllowDynamicImport
    const packageJSON = require(packageJSONLocation);
    if (packageJSON.private === false) {
      workspaces.add({
        name: packageJSON.name,
        version: packageJSON.version,
        description: packageJSON.description,
        homepage: packageJSON.homepage,
      });
    }
  });

  let finalString = '';
  let separator = '';
  workspaces.forEach(workspace => {
    finalString += `${separator}- ${workspace.version} [${workspace.name}](${
      workspace.homepage
    }) - ${workspace.description}`;
    separator = os.EOL;
  });

  const rootFolder = path.dirname(findRootPackageJsonPath());

  glob('/**/*.{md,html}', { root: rootFolder }, (error, filenames) => {
    filenames.forEach(filename => {
      const file = fs.readFileSync(filename).toString();
      const newFile = replaceAutomatorTags(file, taskIdentifier, finalString);
      if (file !== newFile) {
        log(taskIdentifier, `replacing content of ${filename}`);
        fs.writeFileSync(filename, newFile);
      }
    });

    cb();
  });
}

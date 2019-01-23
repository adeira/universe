// @flow

import os from 'os';
import fs from 'fs';
import path from 'path';
import glob from 'glob';
import crypto from 'crypto';
import { iterateWorkspaces, findRootPackageJsonPath } from '@kiwicom/monorepo';

import _git from '../helpers/git';
import replaceAutomatorTags from '../helpers/replaceAutomatorTags';
import openMergeRequest from '../helpers/gitlab/openMergeRequest';
import log from '../log';

const COMMIT_MESSAGE = 'Docs: update NPM packages list';

export default function run(taskIdentifier: string) {
  updateNPMPackagesInfo(taskIdentifier, async (changedFiles: Set<string>) => {
    if (changedFiles.size === 0) {
      log(taskIdentifier, 'nothing to do here, skipping');
      return;
    }

    const gitBranchName = createBranchName(taskIdentifier, changedFiles);
    await commitChanges(gitBranchName, changedFiles);
    await openMergeRequest(gitBranchName, COMMIT_MESSAGE);
  });
}

function createBranchName(taskIdentifier, changedFiles: Set<string>) {
  const hash = crypto.createHash('sha256');
  changedFiles.forEach(changedFile => {
    hash.update(changedFile);
  });
  return `automator-${taskIdentifier}-${hash.digest('hex')}`;
}

async function commitChanges(gitBranchName: string, changedFiles: Set<string>) {
  await _git(['config', 'user.email', 'martin.zlamal@kiwi.com']);
  await _git(['config', 'user.name', 'Automator']);
  await _git([
    'remote',
    'set-url',
    'origin',
    'git@gitlab.skypicker.com:graphql/graphql.git',
  ]);
  await _git(['checkout', '-b', gitBranchName]);
  await _git(['diff']);
  await _git(['add', ...changedFiles]);
  await _git(['commit', '-am', COMMIT_MESSAGE]);
  await _git(['push', 'origin', gitBranchName]);
}

function updateNPMPackagesInfo(
  taskIdentifier: string,
  cb: (changedFiles: Set<string>) => Promise<void>,
): void {
  const workspaces = new Set();

  iterateWorkspaces(packageJSONLocation => {
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
    finalString +=
      separator +
      `- ${workspace.version} [${workspace.name}](${workspace.homepage}) - ${
        workspace.description
      }`;
    separator = os.EOL;
  });

  const rootFolder = path.dirname(findRootPackageJsonPath());
  glob(path.join(rootFolder, '**/*.{md,html}'), (error, filenames) => {
    const changedFiles = new Set();
    filenames.forEach(filename => {
      if (/node_modules/.test(filename)) {
        return;
      }

      const file = fs.readFileSync(filename).toString();
      const newFile = replaceAutomatorTags(file, taskIdentifier, finalString);
      if (file !== newFile) {
        log(taskIdentifier, `replacing content of ${filename}`);
        fs.writeFileSync(filename, newFile);
        changedFiles.add(filename);
      }
    });

    cb(changedFiles);
  });
}

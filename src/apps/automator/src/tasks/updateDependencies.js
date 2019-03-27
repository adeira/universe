// @flow

import fs from 'fs';
import semver from 'semver';
import { ChildProcess, iterateWorkspaces } from '@kiwicom/monorepo';
import { sprintf } from '@kiwicom/js';

import log from '../log';

// info Color legend :
//  "<red>"    : Major Update backward-incompatible updates
//  "<yellow>" : Minor Update backward-compatible features
//  "<green>"  : Patch Update backward-compatible bug fixes
// Package                   Current Wanted Latest Workspace                     Package Type    URL
// @babel/preset-env         7.4.1   7.4.2  7.4.2  @kiwicom/babel-preset-kiwicom dependencies    https://babeljs.io/
// @kiwicom/orbit-components 0.35.0  0.35.0 0.36.0 relay-example                 dependencies    https://github.com/kiwicom/orbit-components#readme
// @sentry/node              4.6.4   4.6.5  4.6.5  @kiwicom/graphql              dependencies    https://github.com/getsentry/sentry-javascript/tree/master/packages/node
// luxon                     1.11.4  1.12.0 1.12.0 @kiwicom/graphql              dependencies    https://github.com/moment/luxon#readme
// react                     16.8.4  16.8.5 16.8.5 @kiwicom/docs                 dependencies    https://reactjs.org/
// react                     16.5.0  16.5.0 16.8.5 example-react-native          dependencies    https://reactjs.org/
// react                     16.8.4  16.8.5 16.8.5 relay-example                 dependencies    https://reactjs.org/
// react-dom                 16.8.4  16.8.5 16.8.5 relay-example                 dependencies    https://reactjs.org/
// react-native              0.57.1  exotic exotic example-react-native          dependencies    https://github.com/expo/react-native/archive/sdk-32.0.0.tar.gz
// react-test-renderer       16.5.0  16.5.0 16.8.5 example-react-native          devDependencies https://reactjs.org/
// styled-components         4.1.3   4.2.0  4.2.0  relay-example                 dependencies    https://styled-components.com

// https://github.com/facebook/fbjs/blob/master/packages/fbjs-scripts/gulp/check-dependencies.js
// http://jsonlines.org/

export default function run(taskIdentifier: string) {
  // TODO: commit the changes + add READMEs into commit message

  const data = ChildProcess.spawnSync('yarn', ['outdated', '--json']);

  const outdatedData = data
    .split('\n')
    .filter(Boolean)
    .map(d => JSON.parse(d))
    .filter(j => j.type === 'table')[0].data;

  // Convert ["Package", "Current",...] to {"Package": 0, ...}
  const name2idx = {};
  outdatedData.head.forEach((key, idx) => (name2idx[key] = idx));
  const {
    Package: NAME,
    Current: CURRENT,
    Latest: LATEST,
    Workspace: WORKSPACE,
    'Package Type': TYPE,
  } = name2idx;

  outdatedData.body.forEach(function(row) {
    const dependencyName = row[NAME];
    const dependencyType = row[TYPE];
    const workspaceName = row[WORKSPACE];

    if (semver.satisfies(row[CURRENT], row[LATEST]) === false) {
      iterateWorkspaces(packageJSONLocation => {
        // $FlowAllowDynamicImport
        const packageJSON = require(packageJSONLocation);
        if (packageJSON.name === workspaceName) {
          const currentVersion = packageJSON[dependencyType][dependencyName];
          const newVersion = `^${row[LATEST]}`;

          // skip exotic dependencies
          if (row[LATEST] === 'exotic') {
            log(
              taskIdentifier,
              sprintf(
                '⚠️ Skipping exotic dependency: %s (in %s) %s -> %s',
                dependencyName,
                workspaceName,
                currentVersion,
                newVersion,
              ),
            );
            return;
          }

          // skip breaking major changes
          if (semver.diff(row[CURRENT], row[LATEST]) === 'major') {
            log(
              taskIdentifier,
              sprintf(
                '⚠️ Skipping major breaking change: %s (in %s) %s -> %s',
                dependencyName,
                workspaceName,
                currentVersion,
                newVersion,
              ),
            );
            return;
          }

          // skip exact (locked) versions
          if (semver.validRange(currentVersion) === currentVersion) {
            log(
              taskIdentifier,
              sprintf(
                '⚠️ Skipping exact (locked) dependency: %s (in %s) %s -> %s',
                dependencyName,
                workspaceName,
                currentVersion,
                newVersion,
              ),
            );
            return;
          }

          log(
            taskIdentifier,
            sprintf(
              '✅ Bumping: %s (in %s) %s -> %s',
              dependencyName,
              workspaceName,
              currentVersion,
              newVersion,
            ),
          );

          // overwrite current version
          packageJSON[dependencyType][dependencyName] = newVersion;
          fs.writeFileSync(
            packageJSONLocation,
            JSON.stringify(packageJSON, null, 2) + '\n',
          );
        }
      });
    }
  });

  ChildProcess.spawnSync('yarn', ['install'], {
    stdio: 'inherit',
  });

  // TODO: yarn upgrade as well (?)
}

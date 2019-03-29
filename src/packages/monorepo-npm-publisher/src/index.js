// @flow

import fs from 'fs';
import tar from 'tar';
import path from 'path';
import util from 'util';
import semver from 'semver';
import rimraf from 'rimraf';
import { transformFileSync } from '@babel/core';
import packlist from 'npm-packlist';
import { Workspaces } from '@kiwicom/monorepo';

import NPM from './NPM';
import log from './log';

type Options = {|
  +dryRun: boolean,
  +buildCache: string,
  +packages: string,
  +npmAuthToken: string,
|};

export default async function publish(options: Options) {
  if (options.dryRun) {
    log('DRY RUN');
  }

  await util.promisify(rimraf)(options.buildCache);

  Workspaces.iterateWorkspacesInPath(
    options.packages,
    async packageJSONLocation => {
      // $FlowAllowDynamicImport
      const packageJSONFile = require(packageJSONLocation);
      if (packageJSONFile.private === true) {
        log(`Skipping ${packageJSONFile.name} because it's PRIVATE ❌`);
      } else {
        const packageFolderPath = path.dirname(packageJSONLocation);
        const packageFolderName = packageFolderPath.replace(
          new RegExp(options.packages + '/'),
          '',
        );

        const data = await NPM.getPackageInfo({
          package: packageJSONFile.name,
          npmAuthToken: options.npmAuthToken,
        });

        if (!semver.gt(packageJSONFile.version, data.latest)) {
          log(
            `Skipping ${
              packageJSONFile.name
            } because there is nothing to release`,
          );
        } else {
          log(`Releasing ${packageJSONFile.name} 🚀`);

          const filenames = await packlist({ path: packageFolderPath });
          for (const filename of filenames) {
            const destinationFileName = path.join(
              options.buildCache,
              packageFolderName,
              filename,
            );

            fs.mkdirSync(path.dirname(destinationFileName), {
              recursive: true,
            });

            if (filename.endsWith('.js')) {
              // this transforms and copy the file
              transformFileVariants(
                path.join(packageFolderPath, filename),
                destinationFileName,
              );
            } else {
              fs.copyFileSync(
                path.join(packageFolderPath, filename),
                destinationFileName,
              );
            }
          }

          await tar.create(
            {
              gzip: true,
              cwd: options.buildCache,
              portable: true,
              file: path.join(options.buildCache, packageFolderName + '.tgz'),
            },
            [packageFolderName],
          );

          if (options.dryRun === false) {
            await NPM.publishPackage({
              metadata: packageJSONFile,
              body: fs.createReadStream(
                path.join(options.buildCache, packageFolderName + '.tgz'),
              ),
              npmAuthToken: options.npmAuthToken,
            });

            log(
              `PUBLISHED ${packageJSONFile.name} version ${
                packageJSONFile.version
              } 🎉`,
            );
          }
        }
      }
    },
  );
}

function transformFileVariants(originalFilename, destinationFilename) {
  const getBabelConfig = (target: 'js' | 'flow') => {
    return {
      root: __dirname, // do not lookup any other Babel config
      presets: [
        [
          '@kiwicom/babel-preset-kiwicom',
          {
            target,
          },
        ],
      ],
    };
  };

  // 1) transform JS version
  try {
    log(`${originalFilename} -> ${destinationFilename}`);
    fs.writeFileSync(
      destinationFilename,
      transformFileSync(originalFilename, getBabelConfig('js')).code,
    );
  } catch (error) {
    log(error);
    process.exit(1);
  }

  // 2) transform Flow version
  try {
    log(`${originalFilename} -> ${destinationFilename}.flow`);
    fs.writeFileSync(
      destinationFilename + '.flow',
      transformFileSync(originalFilename, getBabelConfig('flow')).code,
    );
  } catch (error) {
    log(error);
    process.exit(1);
  }
}

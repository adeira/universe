// @flow strict-local

import path from 'path';
import { findMonorepoRoot, globSync } from '@adeira/monorepo-utils';
import logger from '@adeira/logger';

import requireAndValidateConfig from './requireAndValidateConfig';
import ShipitConfig from './ShipitConfig';

function iterateConfigsInPath(rootPath: string, callback: (ShipitConfig) => void): void {
  const configFiles = globSync('/*.js', {
    root: rootPath,
    ignore: [
      '**/node_modules/**',
      '**/__[a-z]*__/**', // ignore __tests__, __mocks__, ...
    ],
  });

  const monorepoPath = findMonorepoRoot();
  const throwedErrors = new Map<string, Error>();

  configFiles.forEach((configFile) => {
    const config = requireAndValidateConfig(configFile);
    const staticConfig = config.getStaticConfig();
    const branches = config.getBranchConfig
      ? config.getBranchConfig()
      : {
          source: undefined,
          destination: undefined,
        };

    const cfg = new ShipitConfig(
      monorepoPath,
      staticConfig.repository,
      config.getPathMappings(),
      config.getStrippedFiles ? config.getStrippedFiles() : new Set(),
      branches.source,
      branches.destination,
    );

    // We collect all the errors but we do not stop the iteration. These errors
    // are being displayed at the end of the process so that projects which are
    // OK can be exported successfully (and not being affected by irrelevant
    // failures).
    try {
      callback(cfg);
    } catch (error) {
      throwedErrors.set(cfg.exportedRepoURL, error);
    }
  });

  if (throwedErrors.size > 0) {
    throwedErrors.forEach((error, repoURL) => {
      logger.error(repoURL, error.name);
      logger.error(error.stack);
    });
    process.exitCode = 1;
  } else {
    process.exitCode = 0;
  }
}

export default function iterateConfigs(callback: (ShipitConfig) => void): void {
  iterateConfigsInPath(path.join(__dirname, '..', 'config'), callback);
}

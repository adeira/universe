// @flow strict-local

import path from 'path';
import { findMonorepoRoot, globSync } from '@kiwicom/monorepo-utils';
import logger from '@kiwicom/logger';

import requireAndValidateConfig from './requireAndValidateConfig';
import ShipitConfig from './ShipitConfig';

function iterateConfigsInPath(rootPath: string, callback: ShipitConfig => void): void {
  const configFiles = globSync('/*.js', {
    root: rootPath,
    ignore: [
      '**/node_modules/**',
      '**/__[a-z]*__/**', // ignore __tests__, __mocks__, ...
    ],
  });

  const monorepoPath = findMonorepoRoot();
  const throwedErrors = new Set<Error>();

  configFiles.forEach(configFile => {
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
      logger.log(`~~~~~ ${cfg.exportedRepoURL}`);
      logger.log(`Cloning into: ${cfg.destinationPath}`);
      callback(cfg);
      logger.log('✅ done');
    } catch (error) {
      throwedErrors.add(new Error(`${cfg.exportedRepoURL}: ${error}`));
    }
  });

  if (throwedErrors.size > 0) {
    throwedErrors.forEach(error => {
      logger.error(error.message);
    });
    process.exitCode = 1;
  } else {
    process.exitCode = 0;
  }
}

export function iterateReversedConfigs(callback: ShipitConfig => void): void {
  iterateConfigsInPath(path.join(__dirname, '..', 'config', 'reversed'), callback);
}

export default function iterateConfigs(callback: ShipitConfig => void): void {
  iterateConfigsInPath(path.join(__dirname, '..', 'config'), callback);
}

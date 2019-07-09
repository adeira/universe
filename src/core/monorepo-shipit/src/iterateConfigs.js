// @flow strict-local

import path from 'path';
import { findMonorepoRoot, globSync } from '@kiwicom/monorepo-utils';
import logger from '@kiwicom/logger';

import requireAndValidateConfig from './requireAndValidateConfig';
import ShipitConfig from './ShipitConfig';

export default function iterateConfigs(callback: ShipitConfig => void) {
  const configFiles = globSync('/**/*.js', {
    root: path.join(__dirname, '..', 'config'),
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

    const cfg = new ShipitConfig(
      monorepoPath,
      staticConfig.repository,
      config.getDefaultPathMappings(),
      config.getDefaultStrippedFiles
        ? config.getDefaultStrippedFiles()
        : new Set(),
    );

    // We collect all the errors but we do not stop the iteration. These errors
    // are being displayed at the end of the process so that projects which are
    // OK can be exported successfully (and not being affected by irrelevant
    // failures).
    try {
      logger.log(`👾 ${cfg.exportedRepoURL} -> ${cfg.destinationPath}`);
      callback(cfg);
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

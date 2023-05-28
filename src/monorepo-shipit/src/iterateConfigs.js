// @flow strict-local

import path from 'path';
import { findMonorepoRoot, globSync } from '@adeira/monorepo-utils';

import requireAndValidateConfig from './requireAndValidateConfig';
import ShipitConfig from './ShipitConfig';

type IterateConfig = {
  +configFilter: string,
  +configDir: string,
  ...
};

function iterateConfigsInPath(
  options: IterateConfig,
  rootPath: string,
  callback: (ShipitConfig) => void,
): void {
  const configFiles = globSync(options.configFilter, {
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
      config.customShipitFilter,
      config.customImportitFilter,
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
      console.error(repoURL, error.name);
      console.error(error.stack);
    });
    process.exitCode = 1;
  } else {
    process.exitCode = 0;
  }
}

export default function iterateConfigs(
  options: IterateConfig,
  callback: (ShipitConfig) => void,
): void {
  iterateConfigsInPath(options, path.join(process.cwd(), options.configDir), callback);
}

// @flow strict-local

import path from 'path';
import { findMonorepoRoot, globSync } from '@kiwicom/monorepo-utils';

import requireAndValidateConfig from './requireAndValidateConfig';
import PhaseRunnerConfig from './PhaseRunnerConfig';

export default function iterateConfigs(callback: PhaseRunnerConfig => void) {
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

    const cfg = new PhaseRunnerConfig(
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
      /* eslint-disable no-console */
      console.warn(`${cfg.exportedRepoURL} -> ${cfg.exportedRepoPath}`);
      callback(cfg);
      console.warn();
    } catch (error) {
      throwedErrors.add(error);
    }
  });

  if (throwedErrors.size > 0) {
    throwedErrors.forEach(error => {
      console.error(error);
    });
    process.exitCode = 1;
  } else {
    process.exitCode = 0;
  }
}

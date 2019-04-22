// @flow strict-local

import path from 'path';
import { findRootPackageJsonPath, glob } from '@kiwicom/monorepo';
import { sprintf } from '@kiwicom/js';

import PhaseRunnerConfig from '../src/PhaseRunnerConfig';

export default function iterateConfigs(callback: PhaseRunnerConfig => void) {
  const monorepoPath = path.dirname(findRootPackageJsonPath());
  glob(
    '/**/*.js',
    {
      root: path.join(__dirname, '..', 'config'),
      ignore: [
        '**/node_modules/**',
        '**/__[a-z]*__/**', // ignore __tests__, __mocks__, ...
      ],
    },
    (error, configFiles) => {
      if (error !== null) {
        throw error;
      }

      configFiles.forEach(configFile => {
        // $FlowAllowDynamicImport
        const config = require(configFile);
        // TODO: validate config

        const staticConfig = config.getStaticConfig();
        const githubURL = sprintf(
          'git@github.com:%s/%s.git',
          staticConfig.githubOrg,
          staticConfig.githubProject,
        );

        const cfg = new PhaseRunnerConfig(
          monorepoPath,
          githubURL, // TODO: move to the config object (?)
          config.getDefaultPathMappings(),
        );

        callback(cfg);
      });
    },
  );
}

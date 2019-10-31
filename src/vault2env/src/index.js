// @flow

import os from 'os';
import logger from '@kiwicom/logger';

import fetchSecrets from './fetchSecrets';
import getParameters from './getParameters';
import writeEnvFile from './writeEnvFile';

type CLIConfig = { +[key: string]: string, ... };

export default async function run(cliParams: CLIConfig) {
  try {
    const params = getParameters(cliParams);
    const secrets = await fetchSecrets(params.addr, params.path, params.token);

    writeEnvFile(secrets, params.force);

    logger.log('Retrieved secrets:');
    logger.log(Object.keys(secrets).join(os.EOL));
    logger.log('.env file created');
  } catch (err) {
    logger.error(`Error while retrieving secrets: ${err.message}`);
    process.exit(1);
  }
}

type ConditionalVaultSecretsApplier = (
  path: string,
  callback: (data: { +[string]: string, ... }) => void,
) => Promise<void>;

const createConditionalVaultSecretsApplier = (
  addr: ?string,
  token: ?string,
): ConditionalVaultSecretsApplier => {
  return async (path, callback) => {
    if (addr == null || addr === '' || token == null || token === '') {
      return;
    }

    try {
      const data: { +[string]: string, ... } = await fetchSecrets(addr, path, token);
      if (data != null) {
        callback(data);
      }
    } catch (error) {
      logger.error(`Error while retrieving secrets: ${error.message}`);
    }
  };
};

export { createConditionalVaultSecretsApplier };

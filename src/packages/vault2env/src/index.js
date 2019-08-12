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

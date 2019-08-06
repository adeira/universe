// @flow

import fs from 'fs';
import os from 'os';
import fetchWithRetries from '@kiwicom/fetch';
import logger from '@kiwicom/logger';
import { sprintf } from '@kiwicom/js';

import parseEnv from './parseEnv';

type CLIConfig = { +[key: string]: string, ... };

export function _getParams(params: CLIConfig) {
  const requiredVaultParams = ['addr', 'token'];
  const requiredParams = ['path'];
  const vaultParams = requiredVaultParams
    .map(param => {
      const envName = `VAULT_${param.toUpperCase()}`;
      const value = params[param] || process.env[envName];
      if (!value) {
        throw new Error(`You must provide Vault ${param} by "${envName}" or --${param}.`);
      }
      return { [param]: value };
    })
    .reduce((memo, item) => ({ ...memo, ...item }), {});

  requiredParams.forEach(param => {
    if (!params[param]) {
      throw new Error(`You must provide --${param}.`);
    }
  });
  return { ...params, ...vaultParams };
}

async function _getSecrets(addr: string, path: string, token: string) {
  try {
    const apiVersion = 'v1';
    const response = await fetchWithRetries([addr, apiVersion, path].join('/'), {
      method: 'GET',
      headers: {
        'X-Vault-Token': token,
      },
    });

    const json = await response.json();
    return json.data;
  } catch (err) {
    throw new Error(`Error while parsing JSON response from vault: ${err.message}`);
  }
}

export function _writeEnvFile(
  secrets: { +[key: string]: string, ... },
  force: boolean,
  cb?: () => void,
) {
  const output = Object.keys(secrets)
    .map(key => `${key}=${secrets[key]}`)
    .join(os.EOL);

  if (!output) {
    throw new Error('No secrets to write!');
  }

  const envLocation = '.env'; // 🤨

  if (fs.existsSync(envLocation)) {
    const envContent = fs.readFileSync(envLocation, 'utf8');
    const parsedEnv = parseEnv(envContent);

    // make sure we are not trying to overwrite some already existing keys
    for (const key in secrets) {
      if (parsedEnv[key] !== undefined && force !== true) {
        throw new Error(
          sprintf(
            'Cannot overwrite already existing key: %s (use --force to overwrite anyway)',
            key,
          ),
        );
      }
    }

    if (force !== true) {
      throw new Error('.env file already exists, use --force to overwrite.');
    }
  }

  fs.writeFileSync(envLocation, output);

  if (cb) {
    cb();
  }
}

export default async function run(cliParams: CLIConfig) {
  try {
    const params = _getParams(cliParams);
    const secrets = await _getSecrets(params.addr, params.path, params.token);

    _writeEnvFile(secrets, params.force, () => {
      logger.log('Retrieved secrets:');
      logger.log(Object.keys(secrets).join(os.EOL));
      logger.log('.env file created');
    });
  } catch (err) {
    logger.error(`Error while retrieving secrets: ${err.message}`);
    process.exit(1);
  }
}

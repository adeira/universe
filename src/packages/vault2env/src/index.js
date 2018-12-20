/* eslint-disable no-console */
// @flow

import fs from 'fs';
import os from 'os';
import fetchWithRetries from '@mrtnzlml/fetch';
import program from 'commander';

program
  .option('--token <token>')
  .option('--addr <addr>')
  .option('--path <path>')
  .option('--force')
  .parse(process.argv);

export const _getParams = (params: Object) => {
  const requiredVaultParams = ['addr', 'token'];
  const requiredParams = ['path'];
  const vaultParams = requiredVaultParams
    .map(param => {
      const envName = `VAULT_${param.toUpperCase()}`;
      const value = params[param] || process.env[envName];
      if (!value) {
        throw new Error(
          `You must provide Vault ${param} by "${envName}" or --${param}.`,
        );
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
};

const _getSecrets = async (addr: string, path: string, token: string) => {
  try {
    const apiVersion = 'v1';
    const response = await fetchWithRetries(
      [addr, apiVersion, path].join('/'),
      {
        method: 'GET',
        headers: {
          'X-Vault-Token': token,
        },
      },
    );

    const json = await response.json();
    return json.data;
  } catch (err) {
    throw new Error(
      `Error while parsing JSON response from vault: ${err.message}`,
    );
  }
};

export const _writeEnvFile = (
  secrets: Object,
  force: boolean,
  cb?: () => void,
) => {
  const output = Object.keys(secrets)
    .map(key => `${key}=${secrets[key]}`)
    .join(os.EOL);

  if (!output) {
    throw new Error('No secrets to write!');
  }

  fs.access('.env', fs.constants.F_OK, error => {
    if (error) {
      // file doesn't exist yet
      fs.writeFile('.env', output, cb);
    } else if (!force) {
      throw new Error('.env file already exists, use --force to overwrite.');
    } else {
      fs.writeFile('.env', output, cb);
    }
  });
};

export default async function run() {
  try {
    const params = _getParams(program);
    const secrets = await _getSecrets(params.addr, params.path, params.token);

    _writeEnvFile(secrets, params.force, () => {
      console.log('Retrieved secrets:');
      console.log(Object.keys(secrets).join(os.EOL));
      console.log(os.EOL + '.env file created.' + os.EOL);
    });
  } catch (err) {
    console.error(`Error while retrieving secrets: ${err.message}`);
    process.exit(1);
  }
}

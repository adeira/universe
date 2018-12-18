#!/usr/bin/env node

/* eslint-disable no-console */
// @flow

import fs from 'fs';
import os from 'os';
import fetchWithRetries from '@mrtnzlml/fetch';
import program from 'commander';

type Parameters = {
  +force?: boolean,
  +pollute?: boolean,
};

program
  .option('--token <token>')
  .option('--addr <addr>')
  .option('--path <path>')
  .option('--force')
  .option('--pollute')
  .parse(process.argv);

export const getParams = (params: Object) => {
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

const getSecrets = async (addr: string, path: string, token: string) => {
  const apiVersion = 'v1';

  const response = await fetchWithRetries([addr, apiVersion, path].join('/'), {
    method: 'GET',
    headers: {
      'X-Vault-Token': token,
    },
  });
  try {
    const json = await response.json();
    return json.data;
  } catch (err) {
    throw new Error(
      `Error while parsing JSON response from vault: ${err.message}`,
    );
  }
};

const defaultParameters: Parameters = {
  force: false,
  pollute: false,
};

export const writeEnvFile = async (
  secrets: Object,
  userParameters: Parameters = {},
) => {
  const parameters = { ...defaultParameters, ...userParameters };

  const output = Object.keys(secrets)
    .map(key => {
      if (parameters.pollute === true) {
        process.env[key] = secrets[key];
      }
      return `${key}=${secrets[key]}`;
    })
    .join(os.EOL);

  if (!output) {
    throw new Error('No secrets to write!');
  }

  if (!parameters.force) {
    if (await fs.exists('.env')) {
      throw new Error('.env file already exists, use --force to overwrite.');
    }
  }

  return fs.writeFile('.env', output);
};

if (require.main === module) {
  (async () => {
    try {
      const params = getParams(program);
      const secrets = await getSecrets(params.addr, params.path, params.token);
      await writeEnvFile(secrets, {
        force: params.force,
        pollute: params.pollute,
      });

      console.log('Retrieved secrets:');
      console.log(Object.keys(secrets).join(os.EOL));
      console.log(os.EOL + '.env file created.' + os.EOL);
    } catch (err) {
      console.error(`Error while retrieving secrets: ${err.message}`);
      process.exit(1);
    }
  })();
}

// @flow

import { nullthrows } from '@kiwicom/js';

type CLIConfig = { +[key: string]: string, ... };

export default function getParameters(params: CLIConfig): any {
  const requiredVaultParams = ['addr', 'token'];
  const requiredParams = ['path'];
  const vaultParams = requiredVaultParams
    .map(param => {
      const envName = `VAULT_${param.toUpperCase()}`;
      const value = params[param] ?? process.env[envName];
      return {
        [param]: nullthrows(
          value,
          `You must provide Vault ${param} by "${envName}" or --${param}.`,
        ),
      };
    })
    .reduce((memo, item) => ({ ...memo, ...item }), {});

  requiredParams.forEach(param => {
    if (!params[param]) {
      throw new Error(`You must provide --${param}.`);
    }
  });
  return { ...params, ...vaultParams };
}

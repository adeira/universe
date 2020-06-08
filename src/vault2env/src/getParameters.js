// @flow

import { nullthrows } from '@adeira/js';

type CLIConfig = { +[key: string]: string, ... };

export default function getParameters(params: CLIConfig): any {
  const requiredVaultParams = ['addr', 'token'];
  const requiredParams = ['path'];
  const vaultParams = requiredVaultParams
    .map(param => {
      const envName = `VAULT_${param.toUpperCase()}`;
      const value = params[param] ?? process.env[envName];
      return {
        /* $FlowFixMe(>=0.111.0) This comment suppresses an error when
         * upgrading Flow. To see the error delete this comment and run Flow.
         */
        [param]: nullthrows(
          value,
          `You must provide Vault ${param} by "${envName}" or --${param}.`,
        ),
      };
    })
    /* $FlowFixMe(>=0.111.0) This comment suppresses an error when upgrading
     * Flow. To see the error delete this comment and run Flow. */
    .reduce((memo, item) => ({ ...memo, ...item }), {});

  requiredParams.forEach(param => {
    if (!params[param]) {
      throw new Error(`You must provide --${param}.`);
    }
  });
  /* $FlowFixMe(>=0.111.0) This comment suppresses an error when upgrading
   * Flow. To see the error delete this comment and run Flow. */
  return { ...params, ...vaultParams };
}

// @flow strict

type CLIConfig = { +[key: string]: string, ... };

export default function getParameters(params: CLIConfig) {
  const requiredVaultParams = ['addr', 'token'];
  const requiredParams = ['path'];
  const vaultParams = requiredVaultParams
    .map(param => {
      const envName = `VAULT_${param.toUpperCase()}`;
      const value = params[param] ?? process.env[envName];
      if (value == null) {
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

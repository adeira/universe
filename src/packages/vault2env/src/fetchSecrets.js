// @flow

import fetchWithRetries from '@kiwicom/fetch';

export default async function fetchSecrets(addr: string, path: string, token: string) {
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

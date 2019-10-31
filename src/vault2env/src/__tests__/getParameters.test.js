// @flow

import getParameters from '../getParameters';

describe('getParams', () => {
  beforeEach(() => {
    delete process.env.VAULT_TOKEN;
    delete process.env.VAULT_ADDR;
  });

  it('fails when required Vault param is missing', () => {
    expect(() =>
      getParameters({
        token: 'a86d995b-6afa-4076-a3ed-90f11c56d5e5',
        path: 'secret/sample/env',
      }),
    ).toThrow(new Error('You must provide Vault addr by "VAULT_ADDR" or --addr.'));
  });

  it('fails when required param is missing', () => {
    expect(() =>
      getParameters({
        addr: 'http:/localhost',
        token: 'a86d995b-6afa-4076-a3ed-90f11c56d5e5',
      }),
    ).toThrow(new Error('You must provide --path.'));
  });

  it('accepts standard Vault env variables as well', () => {
    process.env.VAULT_ADDR = 'https://example.com';
    const params = {
      token: 'a86d995b-6afa-4076-a3ed-90f11c56d5e5',
      path: 'secret/sample/envs',
    };
    expect(getParameters(params)).toEqual({
      addr: 'https://example.com',
      token: 'a86d995b-6afa-4076-a3ed-90f11c56d5e5',
      path: 'secret/sample/envs',
    });
  });

  it('just returns cli arguments if all required are present', () => {
    const params = {
      addr: 'http:/localhost',
      token: 'a86d995b-6afa-4076-a3ed-90f11c56d5e5',
      path: 'secret/sample/envs',
    };
    expect(getParameters(params)).toEqual(params);
  });
});

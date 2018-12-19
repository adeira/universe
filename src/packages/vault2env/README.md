_Originally located here: https://github.com/kiwicom/vault2env-js_

# vault2env-js

`vault2env` let's you easily load env variables from your Vault instance and save them in `.env` file

## Install

`yarn add vault2env --dev`

## Usage

Basic usage:

`vault2env --token=[vault-token] --addr=[vault-addr] --path=secret/path/to/envs`

Vault token and address can be set also as env variables - just like with the vault command:

`VAULT_TOKEN=[token] VAULT_ADDR=[addr] vault2env --path=secret/path/to/envs`

### List of CLI options

| Option        | Default?   | Required? | Description                               |
| ------------- |:----------:|:---------:|:------------------------------------------|
| `--token`     | -          | yes       | Vault token                               |
| `--addr`      | -          | yes       | Url address to Vault                      |
| `--path`      | -          | yes       | Vault path to desired secrets             |
| `--force`     | false      | no        | Overwrite `.env` file if already exists   |

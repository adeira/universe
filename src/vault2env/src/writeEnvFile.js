// @flow strict

import fs from 'fs';
import os from 'os';
import path from 'path';
import { sprintf } from '@kiwicom/js';

import parseEnv from './parseEnv';

export default function writeEnvFile(secrets: { +[key: string]: string, ... }, force: boolean) {
  const output = Object.keys(secrets)
    .map(key => `${key}=${secrets[key]}`)
    .join(os.EOL);

  if (!output) {
    throw new Error('No secrets to write!');
  }

  const envLocation = path.join(process.cwd(), '.env');

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
}

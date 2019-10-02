// @flow strict

import os from 'os';
import fs from 'fs';

import createQueryID from './createQueryID';

/**
 * Default persist function computes hashed ID and then stores the queries into JSON file on
 * filesystem.
 */
export default function filesystemPersistFunction(
  query: string,
  queryMapPath: string,
): Promise<string> {
  let queryMap = {};
  if (fs.existsSync(queryMapPath)) {
    queryMap = JSON.parse(fs.readFileSync(queryMapPath, 'utf8'));
  }

  const id = createQueryID(query);
  queryMap[id] = query;
  fs.writeFileSync(queryMapPath, JSON.stringify(queryMap, null, 2) + os.EOL, 'utf8');
  return Promise.resolve(id);
}

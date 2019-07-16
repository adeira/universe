// @flow

import protobuf from 'protobufjs';

type AnyObject = { [key: string]: any, ... };

export function parseOptions(rawOptions: AnyObject): AnyObject {
  const options = { graphql: {} };

  Object.entries(rawOptions).forEach(([key, value]) => {
    if (key.startsWith('(graphql_')) {
      const name = key.split('.')[1];
      options.graphql[name] = value;
    } else {
      options[key] = value;
    }
  });
  if (Object.keys(options.graphql).length === 0) {
    delete options.graphql;
  }

  return options;
}

export async function loadFile(filename: string): AnyObject {
  const proto = await protobuf.load(filename);
  const json = await proto.toJSON();
  return mapOptions(json);
}

function mapOptions(obj: AnyObject) {
  if (typeof obj !== 'object') return obj;

  Object.keys(obj).forEach(key => {
    if (key === 'options') {
      obj[key] = parseOptions(obj[key]);
    } else {
      obj[key] = mapOptions(obj[key]);
    }
  });
  return obj;
}

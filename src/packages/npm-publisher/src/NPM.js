// @flow

import NPMRegistryClient from 'npm-registry-client';
import ENV from '@kiwicom/environment';

const URI = 'https://registry.npmjs.org/npm';
const NPM = new NPMRegistryClient();

type Callback = (
  error: {| +statusCode: number |}, // error is an error if there was a problem.
  data: Object, // data is the parsed data object
  raw: string, // raw is the json string
  res: Object, // res is the response from couch
) => void;

export default {
  getPackageInfo: (params: Object, cb: Callback) => {
    return NPM.distTags.fetch(
      URI,
      {
        auth: {
          token: ENV.NPM_AUTH_TOKEN,
        },
        ...params,
      },
      cb,
    );
  },

  publishPackage: (params: Object, cb: Callback) => {
    return NPM.publish(
      URI,
      {
        access: 'public',
        auth: {
          token: ENV.NPM_AUTH_TOKEN,
        },
        ...params,
      },
      cb,
    );
  },
};

// @flow

import NPMRegistryClient from 'npm-registry-client';

const URI = 'https://registry.npmjs.org/npm';
const NPM = new NPMRegistryClient();

type Callback = (
  error: {| +statusCode: number |}, // error is an error if there was a problem.
  data: Object, // data is the parsed data object
  raw: string, // raw is the json string
  res: Object, // res is the response from couch
) => void;

// See NPM_AUTH_TOKEN:
// https://www.npmjs.com/settings/<USERNAME>/tokens

export default {
  getPackageInfo: (params: Object, cb: Callback) => {
    return NPM.distTags.fetch(
      URI,
      {
        auth: {
          token: process.env.NPM_AUTH_TOKEN,
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
          token: process.env.NPM_AUTH_TOKEN,
        },
        ...params,
      },
      cb,
    );
  },
};

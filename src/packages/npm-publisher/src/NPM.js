// @flow

import NPMRegistryClient from 'npm-registry-client';

const URI = 'https://registry.npmjs.org/npm';
const NPM = new NPMRegistryClient({
  log: {
    verbose: () => {},
    info: () => {},
    http: () => {},
  },
});

export default {
  getPackageInfo: (params: {| +package: string, +npmAuthToken: string |}) => {
    return new Promise<Object>((resolve, reject) => {
      NPM.distTags.fetch(
        URI,
        {
          auth: { token: params.npmAuthToken },
          ...params,
        },
        (error, data /* , raw, res */) => {
          if (error) {
            if (error.statusCode !== 404) {
              // 404 indicates that the package doesn't exist (yet)
              reject(error);
            }
          }
          resolve({
            ...data,
            latest: data.latest ?? '0.0.0', // missing in case of 404
          });
        },
      );
    });
  },

  publishPackage: (params: {|
    +metadata: Object, // package.json file
    +body: Object,
    +npmAuthToken: string,
  |}) => {
    return new Promise<void>((resolve, reject) => {
      NPM.publish(
        URI,
        {
          access: 'public',
          auth: { token: params.npmAuthToken },
          ...params,
        },
        (error /* , data , raw, res */) => {
          if (error) {
            reject(error);
          }
          resolve();
        },
      );
    });
  },
};

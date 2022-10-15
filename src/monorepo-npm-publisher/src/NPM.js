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

type PackageInfoPayload = {
  +latest: string,
};

export default {
  getPackageInfo: (params: {
    +package: string,
    +npmAuthToken: string,
  }): Promise<PackageInfoPayload> => {
    return new Promise<PackageInfoPayload>((resolve, reject) => {
      NPM.distTags.fetch(
        URI,
        {
          auth: { token: params.npmAuthToken },
          ...params,
        },
        (error, data /* , raw, res */) => {
          if (error) {
            if (error.statusCode === 404 || error.statusCode === 403) {
              // Package probably doesn't exist (yet). Originally, NPM api was returning 404
              // in this case but somewhere around beginning of 2021 started returning 403.
              return resolve({ latest: '0.0.0' });
            }
            return reject(error);
          }
          return resolve({ latest: data.latest });
        },
      );
    });
  },

  publishPackage: (params: {
    +metadata: { [key: string]: any, ... }, // package.json file
    +body: { [key: string]: any, ... },
    +npmAuthToken: string,
  }): Promise<void> => {
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
          } else {
            resolve();
          }
        },
      );
    });
  },
};

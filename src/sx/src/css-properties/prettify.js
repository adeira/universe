// @flow

import prettier from 'prettier';

export default function prettify(template: string, cb: (string) => void): void {
  prettier.resolveConfig(__filename).then((options) => {
    cb(
      prettier.format(template, {
        filepath: __filename,
        ...options,
      }),
    );
  });
}

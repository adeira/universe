// @flow

import fs from 'fs';
import path from 'path';

import transform from '../index';

it('works as expected', async () => {
  await expect(
    transform(
      fs.readFileSync(path.join(__dirname, '..', '..', 'original', 'backward.svg'), 'utf8'),
      'BackwardIcon',
    ),
  ).resolves.toMatchSnapshot();
});

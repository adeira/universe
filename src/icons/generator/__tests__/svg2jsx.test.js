// @flow

import fs from 'fs';
import path from 'path';

import svg2jsx from '../svg2jsx';

it('works as expected', async () => {
  await expect(
    svg2jsx(
      fs.readFileSync(path.join(__dirname, '..', '..', 'original', 'backward.svg'), 'utf8'),
      'BackwardIcon',
    ),
  ).resolves.toMatchSnapshot();
});

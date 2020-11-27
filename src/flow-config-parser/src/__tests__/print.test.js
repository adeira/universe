// @flow strict

import fs from 'fs';
import path from 'path';

import parse from '../parse';
import print from '../print';

it('prints the config correctly', () => {
  const parsedConfig = parse(
    fs.readFileSync(path.join(__dirname, 'fixtures', '.flowconfig.universe'), 'utf8'),
  );
  const printedConfig = print(parsedConfig);

  expect(printedConfig).toMatchSnapshot();

  // let's parse the printed config once again and compare it with the original (it should match)
  expect(parse(printedConfig)).toStrictEqual(parsedConfig);
});

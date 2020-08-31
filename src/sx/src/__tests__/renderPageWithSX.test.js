// @flow

import path from 'path';
import prettier from 'prettier';
import { generateTestsFromFixtures } from '@adeira/test-utils';
import { sprintf } from '@adeira/js';
import TestRenderer from 'react-test-renderer';

import * as sx from '../../index';
import { styleBuffer, mediaStyleBuffer } from '../styleBuffer';

beforeEach(() => {
  styleBuffer.clear();
  mediaStyleBuffer.clear();
});

const renderPageMock = () => ({
  html: '',
  head: [''],
  styles: [''],
});

generateTestsFromFixtures(path.join(__dirname, 'fixtures'), (input) => {
  const stylesheetsDefinition = JSON.parse(input);
  const styles = sx.create(stylesheetsDefinition);

  let output = '';

  // 1) print final atomic CSS
  const renderer = TestRenderer.create(sx.renderPageWithSX(renderPageMock).styles[0]);
  const css = renderer.root.children[0].toString();
  output += prettier.format(css, { filepath: 'test.css' });

  output += '\n~~~~~~~~~~ USAGE ~~~~~~~~~~\n';

  // 2) print CSS classes when calling the stylesheet name
  Object.keys(stylesheetsDefinition).forEach((stylesheetName) => {
    output += sprintf(
      `
className={styles('%s')}
  ↓ ↓ ↓
class="%s"
`,
      stylesheetName,
      styles(stylesheetName),
    );
  });

  return output;
});

it('works as expected', () => {
  const styles = sx.create({
    red: { color: 'red' },
    blue: { color: 'blue' },
    pseudo: {
      'color': 'green',
      ':hover': {
        color: 'red',
        textDecoration: 'underline',
      },
      ':focus': {
        color: 'purple',
      },
      '::after': {
        content: '🤓',
      },
    },
  });

  expect(styles('red')).toMatchInlineSnapshot(`"wUqnh"`);
  expect(styles('blue')).toMatchInlineSnapshot(`"_4fo5TC"`);

  expect(styles('red', 'blue')).toMatchInlineSnapshot(`"_4fo5TC"`); // blue wins
  expect(styles('blue', 'red')).toMatchInlineSnapshot(`"wUqnh"`); // red wins

  expect(styles('pseudo')).toMatchInlineSnapshot(`"PJDYD _4sFdkU _22QzO9 _3stS2V _14RYUP"`);
  expect(styles('pseudo', 'red')).toMatchInlineSnapshot(`"wUqnh _4sFdkU _22QzO9 _3stS2V _14RYUP"`); // red wins (non-hover)
});

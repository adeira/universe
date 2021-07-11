// @flow

import fs from 'fs';
import os from 'os';
import path from 'path';
import prettier from 'prettier';
import TestRenderer from 'react-test-renderer';
import { isObject, sprintf } from '@adeira/js';

import sx from '../../index';
import StyleCollector from '../StyleCollector';

const fixturesPath = path.join(__dirname, 'fixtures');

expect.addSnapshotSerializer({
  print(serializerValue) {
    return Object.keys(serializerValue)
      .map((key) => {
        const value = serializerValue[key];
        const inspectedValue = isObject(value) ? JSON.stringify(value, null, 2) : value;
        return `~~~~~~~~~~ ${key.toUpperCase()} ~~~~~~~~~~\n${inspectedValue}`;
      })
      .join(os.EOL);
  },
  test() {
    return true;
  },
});

afterEach(() => {
  StyleCollector.reset();
});

const fixturesPaths = fs.readdirSync(fixturesPath);

test.each(fixturesPaths)('matches expected output: %s', (fixturePath) => {
  // 1) original definitions
  const stylesheetsDefinition = require(path.join(fixturesPath, fixturePath)).default;

  try {
    const styles = sx.create(stylesheetsDefinition);
    // 2) atomic CSS
    const renderer = TestRenderer.create(sx.getStyleTag());

    const css = renderer.root.props.dangerouslySetInnerHTML.__html;
    const output = prettier.format(css, { filepath: 'test.css' });

    // 3) usage resulting CSS class names
    let usage = '';
    Object.keys(stylesheetsDefinition).forEach((stylesheetName) => {
      usage += sprintf(
        `
className={styles('%s')}
  ↓ ↓ ↓
class="%s"
`,
        stylesheetName,
        styles(stylesheetName),
      );
    });

    expect({
      input: stylesheetsDefinition,
      output,
      usage,
    }).toMatchSnapshot();
  } catch (error) {
    expect({
      input: stylesheetsDefinition,
      output: `⚠️ THROWN EXCEPTION:\n\n${error.toString()}`,
    }).toMatchSnapshot();
  }
});

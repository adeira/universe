// @flow

import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import SignedSource from '@adeira/signed-source';
import * as changeCase from 'change-case';

import CustomPropertyTypes from './CustomPropertyTypes';

const allProperties = new Set();
const sourceJSON = path.join(__dirname, 'all-properties.en.json');
const allPropertiesRaw = require(sourceJSON);

for (const rawProperty of allPropertiesRaw) {
  const propertyName = changeCase.camelCase(rawProperty.property);
  if (propertyName !== '') {
    allProperties.add(propertyName);
  }
}

// Generate Flow types:

let flowPrint = '';
for (const property of allProperties) {
  let flowType = 'string | number';
  const definedProperty = CustomPropertyTypes.get(property);
  if (definedProperty != null) {
    flowType = definedProperty
      .map((type) => {
        return typeof type === 'symbol' ? Symbol.keyFor(type) : `"${type}"`;
      })
      .join('|');
  }
  flowPrint += `+'${property}'?: ${flowType},\n`;
}

const flowTemplate = SignedSource.signFile(`
/**
 * ${SignedSource.getSigningToken()}
 * @flow strict
 *
 * @see https://www.w3.org/Style/CSS/all-properties.en.html
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Values_and_Units
 */

export type AllCSSPropertyTypes = {|
  ${flowPrint}
|};
`);

prettier.resolveConfig(sourceJSON).then((options) => {
  const formatted = prettier.format(flowTemplate, { filepath: 'mock.js', ...options });
  fs.writeFileSync(
    path.join(__dirname, '__generated__', 'AllCSSPropertyTypes.js'),
    formatted,
    'utf8',
  );
});

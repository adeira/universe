// @flow

const fs = require('fs');
const path = require('path');
const prettier = require('prettier'); // eslint-disable-line import/no-extraneous-dependencies
const SignedSource = require('@adeira/signed-source').default;
const { camelCase } = require('change-case');

const allProperties = new Set();
const sourceJSON = path.join(__dirname, 'all-properties.en.json');
const allPropertiesRaw = require(sourceJSON);

for (const rawProperty of allPropertiesRaw) {
  const propertyName = camelCase(rawProperty.property);
  if (propertyName !== '') {
    allProperties.add(propertyName);
  }
}

// Generate Flow types:

let flowPrint = '';
for (const property of allProperties) {
  flowPrint += `+'${property}'?: string | number,\n`;
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
  const formatted = prettier.format(flowTemplate, options);
  fs.writeFileSync(
    path.join(__dirname, '__generated__', 'AllCSSPropertyTypes.js'),
    formatted,
    'utf8',
  );
});

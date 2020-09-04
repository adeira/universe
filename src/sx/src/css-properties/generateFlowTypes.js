// @flow

import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import { warning } from '@adeira/js';
import SignedSource from '@adeira/signed-source';
import mdnData from 'mdn-data';
import { definitionSyntax } from 'css-tree';
import * as changeCase from 'change-case';

const allProperties = new Set();
const sourceJSON = path.join(__dirname, 'all-properties.en.json');
const allPropertiesRaw = require(sourceJSON);

for (const rawProperty of allPropertiesRaw) {
  // the properties are duplicated in the list
  allProperties.add(rawProperty.property);
}

const FLOW_TYPE_NUMBER = Symbol.for('number');
const FLOW_TYPE_STRING = Symbol.for('string');

let panicCounter = 1;
function collectTypes(syntax) {
  const flowTypes = new Set();
  try {
    const ast = definitionSyntax.parse(syntax);
    definitionSyntax.walk(ast, function enter(node) {
      if (node.type === 'Keyword') {
        flowTypes.add(node.name);
      } else if (node.type === 'Type') {
        if (['length', 'length-percentage'].includes(node.name)) {
          // Length can be Flow type of a number (unitless number converted to PX) or with some
          // explicit unit (therefore string), see: https://developer.mozilla.org/en-US/docs/Web/CSS/length
          flowTypes.add(FLOW_TYPE_NUMBER);
          flowTypes.add(FLOW_TYPE_STRING);
        } else if (['integer', 'number'].includes(node.name)) {
          flowTypes.add(FLOW_TYPE_NUMBER);
        } else if (
          ['angle', 'angle-percentage', 'percentage', 'ratio', 'time'].includes(node.name)
        ) {
          flowTypes.add(FLOW_TYPE_STRING);
        } else {
          throw node;
        }
      } else if (node.type === 'Group') {
        if (node.combinator !== '|' && node.combinator !== ' ') {
          throw node;
        }
      } else if (node.type === 'Multiplier') {
        if (node.comma === true) {
          // multiplier "#" implies the resulting Flow type must be a string becuase the values can repeat
          flowTypes.add(FLOW_TYPE_STRING);
        } else {
          throw node;
        }
      } else {
        throw node;
      }
    });
    return flowTypes;
  } catch (node) {
    warning(
      false,
      'Panicking, unsupported property syntax (%s):\n\t%s\n\t%j',
      panicCounter++,
      syntax,
      node,
    );
    return null;
  }
}

let flowPrint = '';
for (const property of allProperties) {
  const propertyData = mdnData.css.properties[property];

  // default Flow type
  let flowTypes = new Set([FLOW_TYPE_NUMBER, FLOW_TYPE_STRING]);

  const propertySyntax = propertyData?.syntax;
  if (propertySyntax) {
    const accurateFlowTypes = collectTypes(propertySyntax);
    if (accurateFlowTypes != null) {
      flowTypes = accurateFlowTypes;
      // All CSS properties accept the keywords inherit, initial and unset, that are defined throughout CSS.
      // See: https://developer.mozilla.org/en-US/docs/Web/CSS/Value_definition_syntax
      flowTypes.add('inherit');
      flowTypes.add('initial');
      flowTypes.add('unset');
    }
  }

  const propertyName = changeCase.camelCase(property);
  if (propertyName !== '') {
    if (flowTypes.has(FLOW_TYPE_STRING)) {
      // If the type collection yields `string` type, then there is no point in including string
      // enums in the input (because `string` type would swallow it anyway).
      flowTypes.forEach((type) => typeof type === 'string' && flowTypes.delete(type));
    }

    const flowType = Array.from(flowTypes)
      .map((type) => {
        return typeof type === 'symbol' ? Symbol.keyFor(type) : `"${type}"`;
      })
      .join('|');

    const mdnUrlComment = propertyData?.mdn_url != null ? `// ${propertyData.mdn_url}` : '';
    flowPrint += `+'${propertyName}'?:${mdnUrlComment}\n${flowType},`;
  }
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

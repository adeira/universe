// @flow

import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import SignedSource from '@adeira/signed-source';
import mdnData from 'mdn-data';
import * as changeCase from 'change-case';

import collectTypes from './generator/collectTypes';
import { FLOW_TYPE_NUMBER, FLOW_TYPE_STRING } from './generator/flowTypes';

const allProperties = new Map();
for (const rawPropertyName of Object.keys(mdnData.css.properties)) {
  const rawProperty = mdnData.css.properties[rawPropertyName];
  // we don't want prefixed properties
  if (/^(?!-)/.test(rawPropertyName)) {
    allProperties.set(rawPropertyName, rawProperty);
  }
}

let flowPrint = '';
allProperties.forEach((propertyData, property) => {
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
});

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

// # Pseudo classes/elements:
//
// Note: this is currently not very accurate since things like pseudos with arguments won't work (https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child)

let flowPseudoPrint = '';
const cssSelectors = mdnData.css.selectors;
for (const selectorName of Object.keys(cssSelectors)) {
  const selector = cssSelectors[selectorName];
  if (
    /^::?[a-z-]+$/i.test(selectorName) &&
    selector.groups.length === 2 &&
    selector.groups.includes('Selectors') &&
    (selector.groups.includes('Pseudo-classes') || selector.groups.includes('Pseudo-elements'))
  ) {
    const mdnUrlComment = selector?.mdn_url != null ? `// ${selector.mdn_url}` : '';
    flowPseudoPrint += `+'${selectorName}'?:AllCSSPropertyTypes,${mdnUrlComment}\n`;
  }
}

const flowPseudoTemplate = SignedSource.signFile(`
/**
 * ${SignedSource.getSigningToken()}
 * @flow strict
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements
 */

import type { AllCSSPropertyTypes } from './AllCSSPropertyTypes';

export type AllCSSPseudoTypes = {|
  ${flowPseudoPrint}
|};
`);

// Prettier print:

prettier
  .resolveConfig(__filename)
  .then((options) => {
    const formatted = prettier.format(flowTemplate, { filepath: 'mock.js', ...options });
    fs.writeFileSync(
      path.join(__dirname, '__generated__', 'AllCSSPropertyTypes.js'),
      formatted,
      'utf8',
    );
    return options;
  })
  .then((options) => {
    const formatted = prettier.format(flowPseudoTemplate, { filepath: 'mock.js', ...options });
    fs.writeFileSync(
      path.join(__dirname, '__generated__', 'AllCSSPseudoTypes.js'),
      formatted,
      'utf8',
    );
    return options;
  });

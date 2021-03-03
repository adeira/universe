// @flow

import SignedSource from '@adeira/signed-source';
import * as changeCase from 'change-case';
import mdnData from 'mdn-data';

import collectTypes from './generator/collectTypes';
import prettify from './prettify';
import { FLOW_TYPE_NUMBER, FLOW_TYPE_STRING } from './generator/flowTypes';

export default function generatePropertyTypes(cb: (string) => void): void {
  const allProperties = new Map();
  for (const rawPropertyName of Object.keys(mdnData.css.properties)) {
    const rawProperty = mdnData.css.properties[rawPropertyName];
    if (['standard', 'experimental'].includes(rawProperty.status)) {
      // we do not generate "obsolete" and "nonstandard" properties
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

  const template = SignedSource.signFile(`
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

  return prettify(template, cb);
}

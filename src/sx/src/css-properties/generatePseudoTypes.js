// @flow

// eslint-disable-next-line import/no-extraneous-dependencies
import SignedSource from '@adeira/signed-source';
import mdnData from 'mdn-data';

import prettify from './prettify';

// Note: this is currently not very accurate since things like pseudos with arguments won't work
// See: https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child
export default function generatePseudoTypes(cb: (string) => void): void {
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

  const template = SignedSource.signFile(`
/**
 * ${SignedSource.getSigningToken()}
 * @flow strict
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements
 */

import type { AllCSSPropertyTypes } from './AllCSSPropertyTypes';

export type AllCSSPseudoTypes = {
  ${flowPseudoPrint}
};
`);

  return prettify(template, cb);
}

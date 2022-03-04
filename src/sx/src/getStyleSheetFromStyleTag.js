// @flow

/* global document */

import { invariant } from '@adeira/js';

// <style data-adeira-sx />
opaque type StyleElementType = HTMLStyleElement | null;
let styleAdeiraSXTag: StyleElementType = null;

/**
 * This function will try to get already existing `<style data-adeira-sx />` HTML tag or it will
 * create a new virtual one in case it doesn't exist yet.
 */
export default function getStyleSheetFromStyleTag(): CSSStyleSheet {
  if (styleAdeiraSXTag === null) {
    styleAdeiraSXTag = ((document.querySelector('style[data-adeira-sx]'): any): StyleElementType);
    if (styleAdeiraSXTag === null) {
      // Still `null` so let's create the style element:
      const htmlHead = document.head;
      styleAdeiraSXTag = document.createElement('style');
      styleAdeiraSXTag.type = 'text/css';
      styleAdeiraSXTag.setAttribute('data-adeira-sx', '');
      /* $FlowFixMe[incompatible-call] This comment suppresses an error when
       * upgrading Flow. To see the error delete this comment and run Flow. */
      htmlHead?.appendChild(styleAdeiraSXTag);
    }
  }

  /* $FlowFixMe[incompatible-use] This comment suppresses an error when
   * upgrading Flow. To see the error delete this comment and run Flow. */
  const styleSheet = styleAdeiraSXTag.sheet;

  invariant(
    styleSheet != null,
    'SX cannot apply runtime styles because HTMLStyleElement.sheet does not exist.',
  );

  return styleSheet;
}

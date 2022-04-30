/**
 * @flow
 *
 * Quote:
 *
 * Tabbable uses some DOM APIs such as Element.getClientRects() in order to determine node
 * visibility, which helps in deciding whether a node is tabbable, focusable, or neither.
 *
 * When using test engines such as Jest that use JSDom under the hood in order to run tests in
 * Node.js (as opposed to using an automated browser testing tool like Cypress, Playwright, or
 * Nightwatch where a full DOM is available), it is highly recommended (if not essential) to set
 * the displayCheck option to none when calling any of the APIs in this library that accept it.
 *
 * Using any other displayCheck setting will likely lead to failed tests due to nodes expected to
 * be tabbable/focusable being determined to be the opposite because JSDom doesn't fully support
 * some of the DOM APIs being used (even old ones that have been around for a long time).
 *
 * See: https://github.com/focus-trap/tabbable#testing-in-jsdom
 */

const lib = jest.requireActual('tabbable');

const tabbable = ({
  ...lib,
  tabbable: (node, options) => lib.tabbable(node, { ...options, displayCheck: 'none' }),
  focusable: (node, options) => lib.focusable(node, { ...options, displayCheck: 'none' }),
  isFocusable: (node, options) => lib.isFocusable(node, { ...options, displayCheck: 'none' }),
  isTabbable: (node, options) => lib.isTabbable(node, { ...options, displayCheck: 'none' }),
}: $FlowFixMe);

module.exports = tabbable;

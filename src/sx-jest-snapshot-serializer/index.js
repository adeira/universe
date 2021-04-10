// @flow

import { __internal as __sxInternal } from '@adeira/sx';
import prettier from 'prettier';
import prettyFormat from 'pretty-format';

/* global window */

expect.addSnapshotSerializer({
  test: (val) => {
    return (
      val &&
      (val.$$typeof === Symbol.for('react.test.json') || // react-test-renderer
        val instanceof window.HTMLElement) // @testing-library/react
    );
  },
  print: (val) => {
    const printedStyles = prettier.format(
      __sxInternal.StyleCollector.print(), // TODO: apply `stylis` rules to match what SX actually does
      { parser: 'css' },
    );

    const printedHTML = prettier.format(
      prettyFormat(val, {
        plugins: [prettyFormat.plugins.DOMElement, prettyFormat.plugins.ReactTestComponent],
        printFunctionName: false,
      }),
      { parser: 'html' },
    );

    return `${printedStyles}\n${printedHTML.trim()}`;
  },
});

afterEach(() => {
  __sxInternal.StyleCollector.reset();
});

// @flow

import csstree from 'css-tree';

function css(strings): string {
  const css = strings.join('');
  return csstree.generate(csstree.parse(css));
}

// TODO: consider including https://github.com/necolas/normalize.css
export default (css`
  html,
  body {
    font-size: 16px; /* SX expects 16px to be the default (see "transformValue") */
    box-sizing: border-box;
  }

  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }
`: string);

// @flow

import * as React from 'react';

import StyleCollector from './StyleCollector';

type RenderPageResult = {|
  +html: string,
  +head: $ReadOnlyArray<React.Node>,
  +styles: $ReadOnlyArray<any>,
|};

const cssReset = `
body {
  box-sizing: border-box;
}
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}
`;

type Options = {|
  +includeReset?: boolean,
|};

// Note: this is currently a bit Next.js centric, we can make it more abstract later
export default function renderPageWithSX(
  renderPage: () => any,
  options?: Options,
): RenderPageResult {
  const html = renderPage();

  return {
    ...html,
    styles: [
      // We need to render this as html, else things like `content: "ok"` will be rendered as `content: &quot;ok&quot;`, and it is not valid css
      <style
        key="adeira-sx"
        data-adeira-sx={true}
        dangerouslySetInnerHTML={{
          __html: `${options?.includeReset === true ? cssReset : ''}${StyleCollector.print()}`,
        }}
      />,
    ],
  };
}

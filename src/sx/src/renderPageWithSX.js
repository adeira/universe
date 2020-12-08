// @flow

import type { Node } from 'react';
import { compile, serialize, stringify, prefixer, middleware } from 'stylis';

import StyleCollector from './StyleCollector';

type RenderPageResult = {|
  +html: string,
  +head: $ReadOnlyArray<Node>,
  +styles: $ReadOnlyArray<any>,
|};

// Note: this is currently a bit Next.js centric, we can make it more abstract later
export default function renderPageWithSX(renderPage: () => any): RenderPageResult {
  const html = renderPage();

  const cssStyles = serialize(compile(StyleCollector.print()), middleware([prefixer, stringify]));

  return {
    ...html,
    styles: [
      // We need to render this as html, else things like `content: "ok"` will be rendered as `content: &quot;ok&quot;`, and it is not valid css
      <style
        key="adeira-sx"
        data-adeira-sx={true}
        dangerouslySetInnerHTML={{ __html: cssStyles }}
      />,
    ],
  };
}

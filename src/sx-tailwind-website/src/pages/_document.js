// @flow

import type { Node } from 'react';
// $FlowExpectedError[missing-export]: Flow-typed types needs updating
import Document, { Head, Main, NextScript, type DocumentContext, Html } from 'next/document';
import sx from '@adeira/sx';

type RenderPageResult = {
  +html: string,
  +head: $ReadOnlyArray<Node>,
  +styles: $ReadOnlyArray<any>,
};

export default class MyDocument extends Document {
  static getInitialProps(ctx: DocumentContext): RenderPageResult {
    return sx.renderPageWithSX(ctx.renderPage);
  }

  render(): Node {
    return (
      <Html lang="en-US">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link href="https://unpkg.com/tailwindcss@1.8.10/dist/base.css" rel="stylesheet" />
          <link href="/code-block.css" rel="stylesheet" />
          <link
            href="https://fonts.googleapis.com/css?family=Inter:100,200,300,400,500,600,700,800,900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

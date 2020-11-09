// @flow

import type { Node, Element } from 'react';
import Document, { Head, Main, NextScript, type DocumentContext } from 'next/document';
import * as sx from '@adeira/sx';

type RenderPageResult = {|
  +html: string,
  +head: $ReadOnlyArray<Node>,
  +styles: $ReadOnlyArray<any>,
|};

export default class MyDocument extends Document {
  static getInitialProps(ctx: DocumentContext): RenderPageResult {
    return sx.renderPageWithSX(ctx.renderPage);
  }

  render(): Element<'html'> {
    return (
      <html lang="en-US">
        <Head>
          <link href="https://unpkg.com/tailwindcss@1.8.10/dist/base.css" rel="stylesheet" />
          <link
            href="https://fonts.googleapis.com/css?family=Inter:100,200,300,400,500,600,700,800,900"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

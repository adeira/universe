// @flow

import * as React from 'react';
import Document, { Head, Main, NextScript, type DocumentContext } from 'next/document';
import * as sx from '@adeira/sx';

type RenderPageResult = {|
  +html: string,
  +head: $ReadOnlyArray<React.Node>,
  +styles: $ReadOnlyArray<any>,
|};

export default class MyDocument extends Document {
  static getInitialProps(ctx: DocumentContext): RenderPageResult {
    return sx.renderPageWithSX(ctx.renderPage);
  }

  render(): React.Element<'html'> {
    return (
      <html lang="en-US">
        <Head>
          <link href="https://unpkg.com/tailwindcss@1.8.10/dist/base.css" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

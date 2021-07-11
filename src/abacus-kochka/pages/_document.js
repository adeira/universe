// @flow

import React, { type Node, type Element } from 'react';
/* $FlowFixMe[missing-export] This comment suppresses an error when migrating
 * to adeira/universe. To see the error delete this comment and run Flow. */
import Document, { Html, Head, Main, NextScript, type DocumentContext } from 'next/document';
import sx from '@adeira/sx';

type RenderPageResult = {
  +html: string,
  +head?: $ReadOnlyArray<Node | null>,
  +styles?: $ReadOnlyArray<Element<'style'>>,
  ...
};

export default class MyDocument extends Document {
  // See: https://nextjs.org/docs/advanced-features/custom-document#customizing-renderpage
  static async getInitialProps({ renderPage }: DocumentContext): Promise<RenderPageResult> {
    const page = await renderPage();
    return { ...page, styles: [sx.getStyleTag()] };
  }

  createGoogleAnalyticsMarkup(): { __html: string } {
    return {
      __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-148481588-2');`,
    };
  }

  render(): Node {
    return (
      <Html>
        <Head>
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
          <link rel="manifest" href="/favicon/site.webmanifest" />
          <meta name="theme-color" content="#6C1610" />
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-148481588-2" />
          <script dangerouslySetInnerHTML={this.createGoogleAnalyticsMarkup()} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// @flow

import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import sx from '@adeira/sx';

type InitialProps = {|
  +renderPage: () => $FlowFixMe,
|};

type RenderPageResult = {|
  +html: string,
  +head: $ReadOnlyArray<React.Node>,
  +styles: $ReadOnlyArray<any>,
|};

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }: InitialProps): RenderPageResult {
    return sx.renderPageWithSX(renderPage);
  }

  render(): React.Node {
    return (
      <Html>
        <Head>
          {/* <link rel="icon" href="/favicon.ico" /> */}
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <meta name="theme-color" content="#6C1610" />

          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-148481588-2" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'UA-148481588-2');
              `,
            }}
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

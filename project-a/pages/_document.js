// @flow

import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import * as sx from '@adeira/sx';

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
      <Html
        lang={
          'en' // TODO: dynamic if possible
        }
      >
        <Head>
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

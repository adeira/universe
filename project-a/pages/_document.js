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
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

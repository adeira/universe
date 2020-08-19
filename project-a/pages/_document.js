// @flow

import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

import { renderStatic } from '../src/sx';

type InitialProps = {|
  +renderPage: () => $FlowFixMe,
|};

export default class MyDocument extends Document {
  static getInitialProps({
    renderPage,
  }: InitialProps): Promise<{|
    +html: $FlowFixMe,
    +css: string,
  |}> {
    const { html, css } = renderStatic(renderPage);
    return { ...html, css };
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

// @flow

import type { Node, Element } from 'react';
import Document, { Head, Main, NextScript, type DocumentContext } from 'next/document';
import sx from '@adeira/sx';

import { mediaStyles } from '../components/Media';

type RenderPageResult = {
  +html: string,
  +head?: $ReadOnlyArray<Node | null>,
  +styles?: $ReadOnlyArray<Element<'style'>>,
  ...
};

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }: DocumentContext): Promise<RenderPageResult> {
    const page = await renderPage();
    return { ...page, styles: [sx.getStyleTag()] };
  }

  render(): Element<'html'> {
    return (
      <html lang="en-US">
        <Head>
          <link rel="icon" href="https://adeira.dev/img/favicon.ico" />
          <style dangerouslySetInnerHTML={{ __html: mediaStyles }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

// @flow

import type { Node } from 'react';
import App from 'next/app';
import Head from 'next/head';

export default class MyApp extends App {
  render(): Node {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <title>SX Tailwind</title>
        </Head>

        <Component {...pageProps} />
      </>
    );
  }
}

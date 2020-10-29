// @flow

import * as React from 'react';
import App from 'next/app';
import Head from 'next/head';

export default class MyApp extends App {
  render(): React.Node {
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

// @flow strict

import type { Node } from 'react';
import App from 'next/app';
import Head from 'next/head';

import SidebarContextProvider from '../components/sidebar/Context';

export default class MyApp extends App {
  render(): Node {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <title>SX Tailwind</title>
        </Head>

        <SidebarContextProvider>
          <Component {...pageProps} />
        </SidebarContextProvider>
      </>
    );
  }
}

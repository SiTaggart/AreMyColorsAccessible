import React, { ReactElement } from 'react';
import App, { AppContext } from 'next/app';
import { Global } from '@emotion/core';
import { globalStyles } from '../styles/global';

// eslint-disable-next-line import/no-default-export
export default class MyApp extends App {
  public static async getInitialProps({
    Component,
    ctx,
  }: AppContext): Promise<{
    pageProps: {};
  }> {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  public render(): ReactElement<HTMLDivElement> {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Global styles={globalStyles} />
        <Component {...pageProps} />
      </>
    );
  }
}

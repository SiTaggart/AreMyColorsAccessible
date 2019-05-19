import React, { ReactElement } from 'react';
import App, { Container } from 'next/app';
import { Global } from '@emotion/core';
import globalStyles from '../styles/global';

export default class MyApp extends App {
  public static async getInitialProps({
    Component,
    ctx
  }: {
    Component: any;
    ctx: any;
  }): Promise<{
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
        <Container>
          <Component {...pageProps} />
        </Container>
      </>
    );
  }
}

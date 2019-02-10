import React, { ReactElement } from 'react';
import App, { Container } from 'next/app';
import '../styles/index.scss';

export default class MyApp extends App {
  public static async getInitialProps({
    Component,
    ctx
  }: {
    Component: any;
    ctx: any;
  }): Promise<void> {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  public render(): ReactElement<HTMLDivElement> {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

import React from 'react';
import App, { Container } from 'next/app';
import '../styles/index.scss';

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }: { Component: any; ctx: any }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

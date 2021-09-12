import * as React from 'react';
import Document, { Head, Main, NextScript, Html } from 'next/document';

// eslint-disable-next-line import/no-default-export
export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

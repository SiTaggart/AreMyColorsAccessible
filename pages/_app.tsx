import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { Global } from '@emotion/react';
import { globalStyles } from '../styles/global';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        content="Make sure the colours you choose in your designs are accessible to people of all abilities, by choosing colour combinations that pass WCAG 2.0 recommendated colour contrast ratio guidelines."
        name="description"
      />
    </Head>
    <Script id="ga-script">
      {`
        if (!window.Cypress) {
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

          ga('create', 'UA-78674857-1', 'auto');
          ga('send', 'pageview');
        }
      `}
    </Script>
    <Global styles={globalStyles} />
    <Component {...pageProps} />
  </>
);
// eslint-disable-next-line import/no-default-export
export default MyApp;

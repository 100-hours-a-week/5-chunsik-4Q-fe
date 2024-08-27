import React from 'react';
import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/global.css'

const App = ({ Component, pageProps }: AppProps) => (
        <ConfigProvider >
        <Head>
    <meta name="viewport" content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width" />
  </Head>
        <Component {...pageProps} />
    </ConfigProvider>
);

export default App;
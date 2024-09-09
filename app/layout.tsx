import "./global.css";
import "antd/dist/reset.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, ThemeConfig } from "antd";
import { Metadata } from "next";
import Head from "next/head";
import Header from "./(layouts)/header";
import styles from "./layout.module.css";
import GoogleAnalytics from '../lib/GoogleAnalytics';
import { GoogleTagManager } from '@next/third-parties/google'
// import { ReactQueryClientProvider } from '@/components/ReactQueryClientProvider'
 

export const metadata: Metadata = {
  title: {
    template: "4Q | %s",
    default: "4Q | 쉽고 빠른 포토큐알 생성",
  },
  description: "포토 큐알 자동 생성 서비스",
  icons: {
    icon: "/favicon.png",
  },
};

const config: ThemeConfig = {
  token: {
    colorPrimary: "#FF5B0F",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <ReactQueryClientProvider>
    <html lang="en">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1.0, 
          user-scalable=0"
        />
      
      </Head>
      <GoogleTagManager gtmId="GTM-PG8QW8F5" />
      <GoogleAnalytics gaId="G-NX6HMP5K6H"/>
      <body className={styles.container} suppressHydrationWarning>
        <AntdRegistry>
          <ConfigProvider theme={config}>
            <Header />
            <div className={styles.bodyContainer}>{children}</div>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
    // </ReactQueryClientProvider>
  );
}

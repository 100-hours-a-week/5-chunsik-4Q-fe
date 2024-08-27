import "./global.css";
import "antd/dist/reset.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, ThemeConfig } from "antd"; // ConfigProvider 추가
import { Metadata } from "next";
import Head from "next/head";
import Header from "./(layouts)/header";
import styles from "./layout.module.css";
import Analytics from "../service/Analytics";
import { Suspense } from "react";

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
    <html lang="en">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1.0, 
    user-scalable=0"
        />
        	<meta property="og:image" content="https://lh3.googleusercontent.com/fife/ALs6j_GCA3XjLmOjQkrpkneQHYKwbuieDQ-_OxeYw9MyFRTdffIhPfx34QEzyu1LRpT_r-AOfTVx0vsGHYmcp2NhmxM85jPLj5bpKuYa6HChMUc8VAeQ1K4SfqbhjKQNxqf8R0V9DOUPf1f-t70qY6qb8dlzWSDPuUYwuplE-oWN3hJDE8wRYu4wmDWPW9Qw3Siopnze0dOyun0K3PPoag-vB64MmTehYL02mzdBnOtioS597VdXg23CVweKyjtT2XYNEq8ftini6PyrQrbu6c9oatxqwYBSlLGI74MuJF2lQyR1qsgqbhN_sjjnGiZO5ePcGW0txUOuP6i4EWnxAj8hZifVnnSKwOxEeBzsQFngreHfR_LrkDw4qLDu1Nr6z8I9Xo7HEdw1R8kFoNF7uD6aS6yePgNZbyNXbcdNmnWcONgtoXuwZ0HkmLzVJqE0-8heNM2nq0d63qSFCSOLyl3b5Nr7_TPIrOODQ2dwy4Kst7zOpVklmtK1ifPfZcBieeejJ6MBnQtlesLxcXxQekkRnk4z4B57_gqrn7Syl4oZGFCpyXFmeCzPzTMk0O-PMn1M4eMaWb4Aj8gFOM1mDkBM7FZfyyrw1IHX3-_IhGmq84QaOxdkZJSNriFIB3NTjglcMrrFYPvlMvG82xCh97Dpvh0O2G6DPKOM2yYP1CxPpargudn6uRoSDPPGnF6WtoiPOJZXnIZage8RcOR4PKBKxA1srVNH1WsU6tuMKG4p-oWHNX-dNpdEQyLMIgw-02t3nwW6Fa34WihfGw72YPiqZNMQsJb4Lw_8LiEHDMy818ZalC_aIYEK2ehcUgN-O1mDaIiPQKt92hyaQ7kMI6xrvimkFQxBwVtNQTBT34Gt14-gZcitVXMZ1D2RtmT-ersASMLsXxOgQXYspp-9RH2Zwmry23W1j5MAmEbhxSalX4-3za0vtA3dGoJvzayiyYO8QM4Y4wzlBjq6UYiOVDR8yBH9CQ_ywRMpLFN0Aki-Au65ECytnSV3d4HRbAJcguVKXbizGgvT6XmprCFEHSGqSU09yoXFoAy4eLcSjuBgGABuwM5_UBTWQvu6kLjgWvmJ3nXULgZUdr29iDA7E9MzJxrdUTmz-njPupao16Md9l8160RFBaKk6rIVG9iSThlRn4aDAsPmnXAbQrOpD0NGknF1YdhoLgYbk9hcdlXLRDH0UJo0D9_pOIi51ODKEeN8NGi9Wka-hVCRP2ooKevqaV-N5miipx4r6rJJGXo9_t4d8iBEkrho-iGwOnEV9C3uQVx48CIPSKSNIiWUWguqxnx5X89JRxemhg0BbZvLNVQ1JUhAjcE9tBQpFimIhUfZBlCTSFRufFpRYb4Kfa50QYaRVdMOd5bjwOuTO6qZ4lA3i3KpDDMJe_KExxzH_0-HHBin6xEsTSI0_j9Rw7pSREXu_KJ7ttvECgpXXNo44h6W99c-Avizp0roTeBUwF3Q4UQpKlmprum6jv4BX3gw4kzkGg304-wbPJZbwfDbRkn5l5-Ib3QFJD820B6Rj-2Pw59VF1-iPMeUGawLuJFGDszv7ccIHuzb0xRIoNBs9ea6pHdREs1FIXAWi4WoB14aDsC17W1ShuiCgaJFwgFnbfggzXIdHW1cVtWesNZM2syz0hgyixEOyOLWN8pm_61h0sHUWCq9de6DLWw2wQdqKv0kFt8=w2870-h1714"></meta>
          <meta name="twitter:image" content="https://lh3.googleusercontent.com/fife/ALs6j_GCA3XjLmOjQkrpkneQHYKwbuieDQ-_OxeYw9MyFRTdffIhPfx34QEzyu1LRpT_r-AOfTVx0vsGHYmcp2NhmxM85jPLj5bpKuYa6HChMUc8VAeQ1K4SfqbhjKQNxqf8R0V9DOUPf1f-t70qY6qb8dlzWSDPuUYwuplE-oWN3hJDE8wRYu4wmDWPW9Qw3Siopnze0dOyun0K3PPoag-vB64MmTehYL02mzdBnOtioS597VdXg23CVweKyjtT2XYNEq8ftini6PyrQrbu6c9oatxqwYBSlLGI74MuJF2lQyR1qsgqbhN_sjjnGiZO5ePcGW0txUOuP6i4EWnxAj8hZifVnnSKwOxEeBzsQFngreHfR_LrkDw4qLDu1Nr6z8I9Xo7HEdw1R8kFoNF7uD6aS6yePgNZbyNXbcdNmnWcONgtoXuwZ0HkmLzVJqE0-8heNM2nq0d63qSFCSOLyl3b5Nr7_TPIrOODQ2dwy4Kst7zOpVklmtK1ifPfZcBieeejJ6MBnQtlesLxcXxQekkRnk4z4B57_gqrn7Syl4oZGFCpyXFmeCzPzTMk0O-PMn1M4eMaWb4Aj8gFOM1mDkBM7FZfyyrw1IHX3-_IhGmq84QaOxdkZJSNriFIB3NTjglcMrrFYPvlMvG82xCh97Dpvh0O2G6DPKOM2yYP1CxPpargudn6uRoSDPPGnF6WtoiPOJZXnIZage8RcOR4PKBKxA1srVNH1WsU6tuMKG4p-oWHNX-dNpdEQyLMIgw-02t3nwW6Fa34WihfGw72YPiqZNMQsJb4Lw_8LiEHDMy818ZalC_aIYEK2ehcUgN-O1mDaIiPQKt92hyaQ7kMI6xrvimkFQxBwVtNQTBT34Gt14-gZcitVXMZ1D2RtmT-ersASMLsXxOgQXYspp-9RH2Zwmry23W1j5MAmEbhxSalX4-3za0vtA3dGoJvzayiyYO8QM4Y4wzlBjq6UYiOVDR8yBH9CQ_ywRMpLFN0Aki-Au65ECytnSV3d4HRbAJcguVKXbizGgvT6XmprCFEHSGqSU09yoXFoAy4eLcSjuBgGABuwM5_UBTWQvu6kLjgWvmJ3nXULgZUdr29iDA7E9MzJxrdUTmz-njPupao16Md9l8160RFBaKk6rIVG9iSThlRn4aDAsPmnXAbQrOpD0NGknF1YdhoLgYbk9hcdlXLRDH0UJo0D9_pOIi51ODKEeN8NGi9Wka-hVCRP2ooKevqaV-N5miipx4r6rJJGXo9_t4d8iBEkrho-iGwOnEV9C3uQVx48CIPSKSNIiWUWguqxnx5X89JRxemhg0BbZvLNVQ1JUhAjcE9tBQpFimIhUfZBlCTSFRufFpRYb4Kfa50QYaRVdMOd5bjwOuTO6qZ4lA3i3KpDDMJe_KExxzH_0-HHBin6xEsTSI0_j9Rw7pSREXu_KJ7ttvECgpXXNo44h6W99c-Avizp0roTeBUwF3Q4UQpKlmprum6jv4BX3gw4kzkGg304-wbPJZbwfDbRkn5l5-Ib3QFJD820B6Rj-2Pw59VF1-iPMeUGawLuJFGDszv7ccIHuzb0xRIoNBs9ea6pHdREs1FIXAWi4WoB14aDsC17W1ShuiCgaJFwgFnbfggzXIdHW1cVtWesNZM2syz0hgyixEOyOLWN8pm_61h0sHUWCq9de6DLWw2wQdqKv0kFt8=w2870-h1714">
      </Head>
      <body className={styles.container} suppressHydrationWarning>
        <Suspense>
          <Analytics />
        </Suspense>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              components: {
                Select: {
                  fontSize: 16,
                },
              },
              token: {
                // Seed Token
                colorPrimary: "#FF5B0F",

                // borderRadius: 2,

                // Alias Token
                // colorBgContainer: '#f6ffed',
              },
            }}
          >
            <Header />
            <div className={styles.bodyContainer}>{children}</div>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}

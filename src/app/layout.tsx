"use client";

import { createContext, useContext, useState, ReactNode } from "react";

import "./global.css";
import "antd/dist/reset.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, ThemeConfig } from "antd";
import { Metadata } from "next";
import Head from "next/head";
import Header from "./(layouts)/header";
import styles from "./layout.module.css";
import GoogleAnalytics from "../lib/GoogleAnalytics";
import { GoogleTagManager } from "@next/third-parties/google";
// import { ReactQueryClientProvider } from '@/components/ReactQueryClientProvider'

type User = {
  email: string;
  nickname: string;
};

// UserContext 타입 정의
type UserContextType = {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
};

// Context 생성 및 초기화
const UserContext = createContext<UserContextType | undefined>(undefined);

// metadata 설정
// export const metadata: Metadata = {
//   title: {
//     template: "4Q | %s",
//     default: "4Q | 쉽고 빠른 포토큐알 생성",
//   },
//   description: "포토 큐알 자동 생성 서비스",
//   icons: {
//     icon: "/favicon.png",
//   },
// };

// Ant Design 테마 설정
const config: ThemeConfig = {
  token: {
    colorPrimary: "#FF5B0F",
  },
};

// UserProvider 컴포넌트
const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (user: User) => {
    setUser(user);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// UserContext를 사용하는 커스텀 Hook
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// RootLayout 컴포넌트
export default function RootLayout({
  children,
}: {
  children: ReactNode;
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
      <GoogleAnalytics gaId="G-NX6HMP5K6H" />
      <UserProvider>
        <body className={styles.container} suppressHydrationWarning>
          <AntdRegistry>
            <ConfigProvider theme={config}>
              <Header />
              <div className={styles.bodyContainer}>{children}</div>
            </ConfigProvider>
          </AntdRegistry>
        </body>
      </UserProvider>
    </html>
    // </ReactQueryClientProvider>
  );
}

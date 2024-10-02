import { Metadata } from "next";

export const metadata: Metadata = {
  title: "생성하기",
  description: "쉽고 빠르게 포큐를 생성할 수 있는 페이지입니다.",
};

export default function RootLayout({ children }: { children }) {
  return <div>{children}</div>;
}

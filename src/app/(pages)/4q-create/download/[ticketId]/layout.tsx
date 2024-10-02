import { Metadata } from "next";

export const metadata: Metadata = {
  title: "다운로드",
  description: "생성된 포큐를 다운로드할 수 있는 페이지입니다.",
};

export default function RootLayout({ children }: { children }) {
  return <div>{children}</div>;
}

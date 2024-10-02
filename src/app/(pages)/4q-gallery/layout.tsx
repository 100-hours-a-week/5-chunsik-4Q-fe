import { Metadata } from "next";

export const metadata: Metadata = {
  title: "갤러리",
  description: "배경이미지를 모아볼 수 있는 포큐 갤러리입니다.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

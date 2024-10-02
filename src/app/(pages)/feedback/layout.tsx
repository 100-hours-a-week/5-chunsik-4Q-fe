import { Metadata } from "next";

export const metadata: Metadata = {
  title: "피드백",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


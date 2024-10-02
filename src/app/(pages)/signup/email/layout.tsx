import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '4Q | 회원가입',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

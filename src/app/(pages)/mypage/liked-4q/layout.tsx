import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '4Q | 좋아요한 배경',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

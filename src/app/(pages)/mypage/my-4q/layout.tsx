import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '4Q | 나의 포큐',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

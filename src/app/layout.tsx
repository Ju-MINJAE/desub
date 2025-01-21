import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'desub',
  description: '디자인 월 구독 서비스',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

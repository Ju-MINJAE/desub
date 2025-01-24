import type { Metadata } from 'next';
import '../styles/globals.css';
import Footer from './components/ui/Footer';
import Header from './components/ui/Header';

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
      <body className="antialiased flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

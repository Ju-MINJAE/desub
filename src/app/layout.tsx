import type { Metadata } from 'next';
import '../styles/globals.css';
import Footer from './components/ui/Footer';
import Header from './components/ui/Header';
import StoreProvider from './StoreProvider';

export const metadata: Metadata = {
  title: 'desub',
  description: '디자인 월 구독 서비스',
  keywords: [
    '디자인 구독',
    '월간 디자인',
    '디자인 서비스',
    '그래픽 디자인',
    '웹 디자인',
    '로고 디자인',
    '브랜딩',
    '일러스트레이션',
    'UI/UX 디자인',
    '디자인 트렌드',
    '창의적 디자인',
    '전문 디자인',
    '맞춤형 디자인',
    '디자인 솔루션',
    '디자인 플랫폼',
  ],
  openGraph: {
    title: 'desub',
    description: '디자인 월 구독 서비스',
    url: 'https://www.desub.kr/',
    siteName: 'desub',
    images: [
      {
        url: 'https://www.desub.kr/images/desub_thumbnail.png',
        width: 1200,
        height: 630,
        alt: 'desub 썸네일 이미지',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased flex flex-col min-h-screen">
        <StoreProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}

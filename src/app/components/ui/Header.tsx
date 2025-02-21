'use client';

import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './Button';
import { useState } from 'react';
import MobileMenu from './MobileMenu';
import { useAppSelector } from '@/hooks/redux/hooks';
import type { RootState } from '@/store/store';
import { useAppDispatch } from '@/hooks/redux/hooks';
import { logoutUser } from '@/api/auth';
import { getUserSession, clearUserSession } from '@/app/actions/serverAction';
import { logout } from '@/store/authslice';
import { clearUserData } from '@/store/userDataSlice';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  // const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const subscriptionStatus = useAppSelector((state: RootState) => state.subscriptionStatus.status);
  console.log(isAuthenticated, subscriptionStatus);

  const pathname = usePathname();

  // 임시 로그아웃
  const logoutSession = async () => {
    const { accessToken, refreshToken } = await getUserSession();
    if (accessToken && refreshToken) {
      try {
        await logoutUser(accessToken, refreshToken); // 로그아웃 api
        alert('로그아웃 완료');
      } catch (error) {
        console.error('로그아웃 실패', error);
      }
    }
    await clearUserSession(); // 토큰 삭제
    dispatch(logout());
    dispatch(clearUserData());
  };

  if (
    pathname.startsWith('/login') ||
    pathname.includes('/social') ||
    pathname === '/pricing/subscribe' ||
    pathname === '/subscription' ||
    pathname === '/workRequest' ||
    pathname === '/howToRequest' ||
    pathname === '/myInfo'
  )
    return null;

  if (pathname.startsWith('/signup') || pathname === '/pricing/terms') {
    return (
      <div className="w-full">
        <header className="px-[3.7rem] py-[2rem] flex items-center justify-center">
          <Link href="/" className="relative">
            <Image
              src="/images/desub_logo.png"
              alt="header_logo"
              width={194}
              height={44}
              priority
            />
          </Link>
        </header>
      </div>
    );
  }

  const navItems = [
    { href: '/about', label: 'about' },
    { href: '/service', label: 'service' },
    { href: '/pricing', label: 'pricing' },
    { href: '/book', label: 'book a call' },
  ];

  return (
    <div className="w-full fixed top-0 left-0 z-50 bg-white border-b">
      <header className="px-[2rem] md:px-[3.7rem] py-[2rem] flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="outline"
            size="small"
            className="w-[7.3rem] h-[3.3rem] md:hidden text-[1.5rem]"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            Menu
          </Button>

          <Link href="/" className="relative hidden md:block">
            <Image
              src="/images/desub_logo.png"
              alt="header_logo"
              width={170}
              height={40}
              className="w-[130px] h-auto lg:w-[170px]"
            />
          </Link>

          <nav className="hidden md:block pl-[2rem] lg:pl-[4rem] text-[1.6rem] lg:text-[2rem]">
            <ul className="flex gap-[2rem] lg:gap-[4rem]">
              {navItems.map(item => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`transition-all duration-300 whitespace-nowrap ${
                      pathname === item.href
                        ? 'font-bold underline underline-offset-4 decoration-2'
                        : ''
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center">
          {isAuthenticated ? (
            subscriptionStatus === 'subscribed' ? (
              // 로그인 후 구독중
              <>
                <Link href="/subscription" className="ml-[3.9rem] text-[2rem]">
                  my subscription
                </Link>
                <Link
                  href="https://trello.com/b/8NZhWTI4/desub"
                  className="ml-[3.9rem] text-[2rem]"
                >
                  workspace
                </Link>
                <button
                  className="ml-[2rem] lg:ml-[3.9rem] text-[1.6rem] lg:text-[2rem] hidden md:block"
                  onClick={logoutSession}
                >
                  logout
                </button>
              </>
            ) : (
              //  로그인 후 미구독
              <div>
                <Button
                  variant="green"
                  size="small"
                  className="!w-[10.7rem] h-[3.3rem] md:hidden text-[1.5rem]"
                  onClick={() => router.push('/subscription')}
                >
                  subscribe
                </Button>

                <div className="hidden md:flex items-center">
                  <Button
                    variant="green"
                    size="small"
                    className="w-[12rem] lg:w-[14.2rem] h-[3.5rem] lg:h-[5rem] lg:text-[2rem] text-[1.6rem]"
                    onClick={() => router.push('/pricing/subscribe')}
                  >
                    subscribe
                  </Button>
                  <Link
                    href="/subscription"
                    className="ml-[2rem] lg:ml-[3.9rem] text-[1.6rem] lg:text-[2rem] whitespace-nowrap"
                  >
                    my subscription
                  </Link>
                  <button
                    className="ml-[2rem] lg:ml-[3.9rem] text-[1.6rem] lg:text-[2rem] hidden md:block"
                    onClick={logoutSession}
                  >
                    logout
                  </button>
                </div>
              </div>
            )
          ) : (
            // 기본
            <>
              <Button
                variant="green"
                size="small"
                className="!w-[10.7rem] md:!w-[14.2rem] !h-[3.3rem] md:!h-[5rem] text-[1.5rem] md:text-[2rem]"
                onClick={() => router.push('/pricing/subscribe')}
              >
                subscribe
              </Button>
              {/* <Link href="/login" className="hidden md:block">
                <button className="ml-[2rem] lg:ml-[3.9rem] text-[1.6rem] lg:text-[2rem]">
                  login
                </button>
              </Link> */}
              <button
                className="ml-[2rem] lg:ml-[3.9rem] text-[1.6rem] lg:text-[2rem] hidden md:block"
                onClick={() => router.push('/login')}
              >
                login
              </button>
            </>
          )}
        </div>
      </header>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </div>
  );
};

export default Header;

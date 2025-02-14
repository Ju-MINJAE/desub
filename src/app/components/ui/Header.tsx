'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './Button';
import { useState } from 'react';
import MobileMenu from './MobileMenu';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();
  if (
    pathname === '/login' ||
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
            <Image src="/images/desub_logo.png" alt="header_logo" width={194} height={44} />
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
                    className={`transition-all duration-300 ${
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
          <Link href="/subscription">
            <Button
              variant="green"
              size="small"
              className="!w-[10.7rem] md:!w-[14.2rem] !h-[3.3rem] md:!h-[5rem] text-[1.5rem] md:text-[2rem]"
            >
              subscribe
            </Button>
          </Link>

          <Link href="/login" className="hidden md:block">
            <button className="ml-[2rem] lg:ml-[3.9rem] text-[1.6rem] lg:text-[2rem]">login</button>
          </Link>
        </div>
      </header>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </div>
  );
};

export default Header;

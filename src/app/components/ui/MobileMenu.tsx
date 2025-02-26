'use client';

import type React from 'react';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useAppSelector } from '@/hooks/redux/hooks';
import { useAppDispatch } from '@/hooks/redux/hooks';
import { getUserSession, clearUserSession } from '@/app/actions/serverAction';
import { logout } from '@/store/authslice';
import { clearUserData } from '@/store/userDataSlice';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const router = useRouter();
  const pathname = usePathname();
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { refreshToken } = await getUserSession();
      if (!refreshToken) {
        await clearUserSession();
        dispatch(logout());
        dispatch(clearUserData());
      }
    };
    checkSession();
  }, [dispatch]);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
      document.body.style.overflow = 'hidden';
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!shouldRender) return null;

  const menuItems = [
    { href: '/about', label: 'About' },
    { href: '/service', label: 'Service' },
    { href: '/pricing', label: 'Pricing' },
    // { href: '/book', label: 'Book a call' },
    { href: '/pricing/subscribe', label: 'Subscribe', className: 'pt-[3.5rem]' },
    ...(isAuthenticated ? [{ href: '/subscription', label: 'My subscription' }] : []),
  ];

  return (
    <div
      className={`fixed inset-0 bg-black z-50 text-white overflow-y-auto flex flex-col
        transition-all duration-300 ease-in-out
        ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
    >
      <div
        className={`flex justify-center items-center py-[3.4rem]
        transition-all duration-300 ease-in-out
        ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
      >
        <Link href="/" onClick={onClose}>
          <Image
            width={130}
            height={28}
            alt="desub_mobile_menu_logo"
            src="/images/desub_logo_white.png"
          />
        </Link>
      </div>

      <nav className="flex-1 px-[5rem] pt-[5.6rem]">
        <ul className="space-y-[2.7rem] text-[3rem]">
          {menuItems.map((item, index) => (
            <li
              key={item.href}
              className={`${item.className}
                transition-all duration-300 ease-in-out
                ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              `}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              <Link
                href={item.href}
                onClick={onClose}
                className={`${
                  pathname === item.href ? 'text-primary' : 'text-white hover:text-gray-300'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div
        className={`flex flex-row justify-between px-[2.4rem] pb-[2.6rem]
        transition-all duration-300 ease-in-out
        ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        style={{ transitionDelay: `${(menuItems.length + 1) * 100}ms` }}
      >
        <button
          className="w-[7.3rem] h-[3.3rem] bg-transparent text-white border border-white rounded-[2rem]"
          onClick={onClose}
        >
          Menu
        </button>
        {!isAuthenticated && (
          <button
            className="w-[7.3rem] h-[3.3rem] bg-transparent text-white border border-white rounded-[2rem]"
            onClick={() => {
              router.push('/login');
              onClose();
            }}
          >
            login
          </button>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;

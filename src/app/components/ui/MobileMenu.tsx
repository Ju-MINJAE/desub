import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from './Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 text-white overflow-y-auto flex flex-col">
      <div className="flex justify-center items-center py-[3.4rem]">
        <Link href="/" onClick={onClose}>
          <Image
            width={130}
            height={28}
            alt="desub_mobile_menu_logo"
            src="/images/desub_logo_white.png"
          />
        </Link>
      </div>

      <nav className="flex-1 px-[5rem] pt-[11.6rem]">
        <ul className="space-y-[2.7rem] text-[3rem]">
          <li>
            <Link href="/about" onClick={onClose}>
              About
            </Link>
          </li>
          <li>
            <Link href="/service" onClick={onClose}>
              Service
            </Link>
          </li>
          <li>
            <Link href="/pricing" onClick={onClose}>
              Pricing
            </Link>
          </li>
          <li>
            <Link href="/book" onClick={onClose}>
              Book a call
            </Link>
          </li>
          <li className="pt-[5.8rem]">
            <Link href="/subscribe" onClick={onClose}>
              Subscribe
            </Link>
          </li>
        </ul>
      </nav>

      <div className="flex flex-row justify-between px-[2.4rem] pb-[2.6rem]">
        <Button
          variant="outline"
          size="small"
          className="!w-[7.3rem] !h-[3.3rem] bg-transparent text-white border-white"
        >
          Menu
        </Button>
        <Button
          variant="outline"
          size="small"
          className="!w-[7.3rem] !h-[3.3rem] bg-transparent text-white border-white"
          onClick={() => {
            router.push('/login');
            onClose;
          }}
        >
          login
        </Button>
      </div>
    </div>
  );
};

export default MobileMenu;

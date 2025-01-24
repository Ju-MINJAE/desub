import Image from 'next/image';
import Link from 'next/link';
import { Button } from './Button';

const Header = () => {
  return (
    <div className="w-full border-b">
      <header className="px-[3.7rem] py-[2rem] flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="relative">
            <Image src="/images/desub_logo.png" alt="header_logo" width={170} height={40} />
          </Link>

          <nav className="pl-[4rem] text-[2rem]">
            <ul className="flex gap-[4rem]">
              <li>
                <Link href="/about">about</Link>
              </li>
              <li>
                <Link href="/service">service</Link>
              </li>
              <li>
                <Link href="/pricing">pricing</Link>
              </li>
              <li>
                <Link href="/book">book a call</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex items-center">
          <Button variant="green" className="w-[14.2rem] h-[5rem] text-[2rem]">
            subscribe
          </Button>
          <Link href="/login">
            <button className="ml-[3.9rem] text-[2rem]">login</button>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Header;

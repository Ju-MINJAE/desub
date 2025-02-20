import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full px-[13rem] py-[10rem]">
      <Link href="/">
        <Image
          src="/images/desub_logo.png"
          alt="Footer"
          width={447}
          height={105}
          className="w-full h-auto"
          priority
        />
      </Link>
      <p className="text-[2rem] mt-[5rem]">copyright(c) 2025. desub.</p>
    </footer>
  );
};

export default Footer;

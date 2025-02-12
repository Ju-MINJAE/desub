import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full px-[13rem] py-[10rem]">
      <Link href="/">
        <Image
          src="/images/desub_logo.png"
          alt="Footer"
          width={1920}
          height={100}
          className="w-full h-auto"
        />
      </Link>
      <p className="text-[2rem] mt-[5rem]">copyright(c) 2025. desub.</p>
    </footer>
  );
};

export default Footer;

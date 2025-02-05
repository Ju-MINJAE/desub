import Link from 'next/link';

type TextButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

const TextButton: React.FC<TextButtonProps> = ({ children, className, href }) => {
  return (
    <Link
      href={href}
      className={`text-[1.3rem] leading-[1.6rem] font-medium underline ${className}`}
    >
      {children}
    </Link>
  );
};

export default TextButton;

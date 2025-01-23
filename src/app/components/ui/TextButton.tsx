import Link from 'next/link';

type TextButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

const TextButton: React.FC<TextButtonProps> = ({ children, className }) => {
  return (
    <Link href="" className={`text-[0.8125rem] leading-[1rem] font-medium underline ${className}`}>
      {children}
    </Link>
  );
};

export default TextButton;

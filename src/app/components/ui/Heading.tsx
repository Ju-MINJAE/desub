type HeadingProps = {
  tag?: 'h1' | 'h2' | 'h3';
  children: React.ReactNode;
  className?: string;
};

const Heading: React.FC<HeadingProps> = ({ tag: Tag = 'h1', children, className }) => {
  const baseClasses = {
    h1: 'text-[5rem] leading-[7.5rem] font-bold',
    h2: 'text-[1.875rem] leading-[2.8125rem] font-medium',
    h3: 'text-[1.25rem] leading-[1.875rem] font-medium',
  };

  return <Tag className={`${baseClasses[Tag] || ''} ${className}`}>{children}</Tag>;
};

export default Heading;

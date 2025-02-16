type HeadingProps = {
  tag?: 'h1' | 'h2' | 'h3';
  children: React.ReactNode;
  className?: string;
};

const Heading: React.FC<HeadingProps> = ({ tag: Tag = 'h1', children, className }) => {
  const baseClasses = {
    h1: 'text-[3rem] md:text-[8rem] leading-[4.5rem] md:leading-[12rem] font-bold',
    h2: 'text-[1.8rem] md:text-[3rem] leading-[4.5rem] font-medium',
    h3: 'text-[2rem] leading-[3rem] font-medium',
  };

  return <Tag className={`${baseClasses[Tag] || ''} ${className}`}>{children}</Tag>;
};

export default Heading;

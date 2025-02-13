import Image from 'next/image';

interface FeatureItemProps {
  imageSrc: string;
  title: string;
  description: string;
}

const FeatureItem = ({ imageSrc, title, description }: FeatureItemProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[33rem] md:w-full aspect-square">
        <Image
          src={imageSrc || '/placeholder.svg'}
          alt={title}
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
      <h3 className="mt-[2.7rem] md:mt-[6.2rem] text-[2.5rem] md:text-[4.5rem] font-semibold text-center">
        {title}
      </h3>
      <p className="mt-[1.5rem] md:mt-[4.3rem] px-2 text-[1.6rem] md:text-[2.5rem] text-black text-center">
        {description}
      </p>
    </div>
  );
};

export default FeatureItem;

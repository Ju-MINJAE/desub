import Image from 'next/image';

interface FeatureItemProps {
  imageSrc: string;
  title: string;
  description: string;
}

const FeatureItem = ({ imageSrc, title, description }: FeatureItemProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full aspect-square">
        <Image
          src={imageSrc || '/placeholder.svg'}
          alt={title}
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
      <h3 className="text-[2.8125rem] text-center font-semibold mt-[3.875rem]">{title}</h3>
      <p className="text-[1.5625rem] text-black text-center mt-[2.6875rem] px-2">{description}</p>
    </div>
  );
};

export default FeatureItem;

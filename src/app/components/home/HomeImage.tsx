import Image from 'next/image';

const HomeImage = () => {
  return (
    <div className="relative w-screen h-[25rem] md:h-[40rem]">
      <Image
        src="/images/desub_home_img.png"
        fill
        alt="Desub home illustration"
        className="object-cover"
        priority
      />
    </div>
  );
};

export default HomeImage;

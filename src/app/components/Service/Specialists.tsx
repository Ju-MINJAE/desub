import Image from 'next/image';

const Specialists = () => {
  return (
    <div className="mt-[8.8rem] reletive">
      <div className="bg-gray w-[27.4rem] h-[19.2rem] absolute z-1">
        <Image src="/images/Specialists1.png" alt="" fill style={{ objectFit: 'cover' }} />
      </div>
      <div className="flex flex-col items-center gap-[5.8rem] font-light text-[6rem] pt-[11.7rem]">
        <p className="hover:underline hover:decoration-2">UIUX</p>
        <p className="hover:underline hover:decoration-2">E-commerse</p>
        <p className="hover:underline hover:decoration-2">Brandging</p>
        <p className="hover:underline hover:decoration-2">Printing</p>
        <p className="hover:underline hover:decoration-2">Product Design</p>
      </div>
    </div>
  );
};

export default Specialists;

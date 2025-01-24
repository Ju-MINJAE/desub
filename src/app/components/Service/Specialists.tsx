import Image from 'next/image';

const Specialists = () => {
  return (
    <div className="mt-[8.8rem] relative">
      <div id="gray" className="w-[27.4rem] h-[19.2rem] absolute left-[calc(100%-14rem)]">
        <div className="bg-gray w-full h-full z-10 absolute top-0 left-0 hover:bg-opacity-0"></div>
        <Image
          src="/images/Specialists1.png"
          alt=""
          fill
          style={{ objectFit: 'cover', zIndex: 1 }}
        />
      </div>

      <div
        id="gray"
        className="w-[27.4rem] h-[28.2rem] absolute top-[15.8rem] right-[calc(100%+0.5rem)]"
      >
        <div className="bg-gray w-full h-full z-10 absolute top-0 left-0 hover:bg-opacity-0"></div>
        <Image
          src="/images/Specialists1.png"
          alt=""
          fill
          style={{ objectFit: 'cover', zIndex: 1 }}
        />
      </div>

      <div
        id="gray"
        className="w-[31.1rem] h-[15.5rem] absolute top-[36.4rem] left-[calc(100%-5rem)]"
      >
        <div className="bg-gray w-full h-full z-10 absolute top-0 left-0 hover:bg-opacity-0"></div>
        <Image
          src="/images/Specialists1.png"
          alt=""
          fill
          style={{ objectFit: 'cover', zIndex: 1 }}
        />
      </div>

      <div
        id="gray"
        className="w-[21.6rem] h-[16.9rem] absolute top-[53.7rem] right-[calc(100%-11rem)]"
      >
        <div className="bg-gray w-full h-full z-10 absolute top-0 left-0 hover:bg-opacity-0"></div>
        <Image
          src="/images/Specialists1.png"
          alt=""
          fill
          style={{ objectFit: 'cover', zIndex: 1 }}
        />
      </div>

      <div
        id="gray"
        className="w-[42.6rem] h-[23.9rem] absolute top-[80.8rem] left-[calc(100%-34rem)]"
      >
        <div className="bg-gray w-full h-full z-10 absolute top-0 left-0 hover:bg-opacity-0"></div>
        <Image
          src="/images/Specialists1.png"
          alt=""
          fill
          style={{ objectFit: 'cover', zIndex: 1 }}
        />
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

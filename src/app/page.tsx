import Image from 'next/image';

const Home = () => {
  return (
    <div className="flex flex-col ">
      <div className="relative w-full h-[49.6875rem] max-h-screen">
        <Image
          src="/images/desub_banner.svg"
          alt="Desub Banner"
          fill
          sizes="100vw"
          style={{
            objectFit: 'contain',
            objectPosition: 'top',
          }}
          priority
        />
      </div>

      {/* Text */}
      <div className="text-center mt-[10.625rem]">
        <div className="font-normal text-[2.5rem]">
          no more member change <br />& mis-communications!
        </div>

        <div className="font-bold text-[6.25rem] text-center mt-[1.1875rem]">
          designer subscription system
        </div>
      </div>

      {/* Features */}
      <div className="mt-[9.4375rem]">
        <span className="font-normal text-[2.5rem] ml-[8.4375rem]">
          Features
        </span>
        <div className="flex flex-row justify-center items-start mt-[3.625rem] gap-[2.5rem] px-[5.625rem]">
          <div className="relative w-[30.3125rem] h-[30.3125rem]">
            <Image
              src="/images/features3.svg"
              alt="feature1"
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div className="relative w-[30.3125rem] h-[30.3125rem]">
            <Image
              src="/images/features3.svg"
              alt="feature2"
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div className="relative w-[30.3125rem] h-[30.3125rem]">
            <Image
              src="/images/features3.svg"
              alt="feature3"
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

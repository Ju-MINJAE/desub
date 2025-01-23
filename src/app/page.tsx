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
      <div className="mt-[5rem] md:mt-[9.4375rem] w-full">
        <span className="font-normal text-2xl md:text-[2.5rem] ml-4 md:ml-[8.4375rem] block">
          Features
        </span>
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start mt-[2rem] md:mt-[3.625rem] gap-[2.5rem] px-4 md:px-[5.625rem]">
          <div className="flex flex-col items-center w-full max-w-[30.3125rem]">
            <div className="relative w-full aspect-square max-w-[30.3125rem]">
              <Image
                src="/images/features3.svg"
                alt="feature1"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
            <h3 className="text-xl font-semibold mt-4">No more paper</h3>
            <p className="text-sm text-gray-600 text-center px-4">
              고객은 반복적인 계약과정 없이도 필요할 때마다 맞춤형 디자인 지원
            </p>
          </div>
          <div className="flex flex-col items-center w-full max-w-[30.3125rem]">
            <div className="relative w-full aspect-square max-w-[30.3125rem]">
              <Image
                src="/images/features3.svg"
                alt="feature2"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
            <h3 className="text-xl font-semibold mt-4">Perfect fit</h3>
            <p className="text-sm text-gray-600 text-center px-4">
              핏이 잘 맞고 쉬운 디자인 커뮤니케이션
            </p>
          </div>
          <div className="flex flex-col items-center w-full max-w-[30.3125rem]">
            <div className="relative w-full aspect-square max-w-[30.3125rem]">
              <Image
                src="/images/features3.svg"
                alt="feature3"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
            <h3 className="text-xl font-semibold mt-4">Sustainable works</h3>
            <p className="text-sm text-gray-600 text-center px-4">
              이직/인사이동 리스크 없이 지속가능한 작업
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

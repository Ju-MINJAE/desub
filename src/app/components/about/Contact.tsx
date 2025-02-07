import Image from 'next/image';

const ContactSection: React.FC = () => {
  return (
    <section className="mt-[29.4rem]">
      <div className="mx-[7rem] relative aspect-[1.91/1]">
        <div className="absolute w-[71rem] h-[15rem] top-[-20%] right-[2%] bg-[#8F0] shadow-lg flex items-center rotate-[-13.369deg] z-10">
          <p className="text-[4rem] font-bold text-center">
            wassup? desub! wassup? desub! wassup? desub! wassup? desub!
          </p>
        </div>
        <Image src="/images/doll.png" alt="doll" fill className="object-cover rounded-[5.4rem]" />
        <div className="absolute left-[17%] top-[41%] z-20 w-[35rem] h-[35rem] bg-[#FF009D] rounded-full flex items-center justify-center p-[8rem] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
          <Image
            src="/icons/Union.svg"
            alt="stick"
            width={0}
            height={0}
            className="w-full h-full"
          />
        </div>
        <Image
          src="/icons/vector.svg"
          alt="Vector"
          width={290}
          height={290}
          className="absolute right-[25%] top-[23%] z-20 bg-white p-[6.6rem] rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
        />
      </div>

      <div className="ml-[22.5rem] mt-[30.4rem] space-y-[2rem] text-[7rem] font-bold">
        <p>
          똑같은 해답은
          <br />
          우리의 방식이 아닙니다.
          <br />
          당신과 함께
          <br />
          비범함을 디자인합니다.
        </p>
      </div>
      <a
        href="https://dbre.co.kr/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center ml-[22.5rem] mt-[15.9rem] pb-[19.5rem] cursor-pointer"
      >
        <button className="w-[71rem] flex-shrink-0 bg-[#161616] text-white py-[2rem] rounded-[5.9rem] text-[7rem] font-bold">
          <span className="underline underline-offset-[1.5rem]">desub과 함께하기</span>
        </button>
        <Image
          src="/icons/Arrow_right.svg"
          alt="arrow-right"
          width={40}
          height={40}
          className="w-[10.5rem] ml-[5.5rem]"
        />
      </a>
    </section>
  );
};

export default ContactSection;

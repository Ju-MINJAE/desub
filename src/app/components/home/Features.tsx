import FeatureItem from './FeatureItem';

const Features = () => {
  return (
    <div className="mt-[5rem] md:mt-[9.4375rem] w-full">
      <span className="ml-[4rem] md:ml-[13.5rem] font-normal text-[1.8rem] md:text-[4rem] block">
        Features
      </span>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[4rem] mt-[2rem] md:mt-[3.625rem] px-4 md:px-[5.625rem]">
        <FeatureItem
          imageSrc="/images/desub_feature1.png"
          title={
            <p>
              No more
              <br />
              Paper
            </p>
          }
          description={
            <p>
              고객은 반복적인
              <br />
              계약과정 없이도 필요할 때마다
              <br />
              맞춤형 디자인 지원
            </p>
          }
        />
        <FeatureItem
          imageSrc="/images/desub_feature2.png"
          title={
            <p>
              Perfect
              <br />
              fit
            </p>
          }
          description={
            <p>
              핏이 잘 맞고 쉬운
              <br />
              디자인 커뮤니케이션
            </p>
          }
        />
        <FeatureItem
          imageSrc="/images/desub_feature3.png"
          title={
            <p>
              Sustainable
              <br />
              works
            </p>
          }
          description={
            <p>
              이직/인사이동 리스크 없이
              <br />
              지속가능한 작업
            </p>
          }
        />
      </div>
    </div>
  );
};

export default Features;

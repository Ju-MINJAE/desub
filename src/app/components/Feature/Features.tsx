import FeatureItem from './FeatureItem';

const Features = () => {
  return (
    <div className="mt-[5rem] md:mt-[9.4375rem] w-full">
      <span className="font-normal text-2xl md:text-[2.5rem] ml-4 md:ml-[8.4375rem] block">
        Features
      </span>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[2.5rem] mt-[2rem] md:mt-[3.625rem] px-4 md:px-[5.625rem]">
        <FeatureItem
          imageSrc="/images/feature3.png"
          title="No more paper"
          description="고객은 반복적인 계약과정 없이도 필요할 때마다 맞춤형 디자인 지원"
        />
        <FeatureItem
          imageSrc="/images/feature3.png"
          title="Perfect fit"
          description="핏이 잘 맞고 쉬운 디자인 커뮤니케이션"
        />
        <FeatureItem
          imageSrc="/images/feature3.png"
          title="Sustainable works"
          description="이직/인사이동 리스크 없이 지속가능한 작업"
        />
      </div>
    </div>
  );
};

export default Features;

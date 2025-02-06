import Heading from '../ui/Heading';

const LatestWorks = () => {
  return (
    <div className="flex flex-col">
      <Heading tag="h1" className="px-[12rem] pt-36 ">
        Check our
        <br />
        Latest works
      </Heading>

      <div className="flex flex-row gap-12">
        <div className="w-[51.3rem] h-[73.7rem] rounded-[4.6rem] bg-slate-300"></div>
        <div className="w-[51.3rem] h-[73.7rem] rounded-[4.6rem] bg-slate-300"></div>
        <div className="w-[51.3rem] h-[73.7rem] rounded-[4.6rem] bg-slate-300"></div>
      </div>
    </div>
  );
};

export default LatestWorks;

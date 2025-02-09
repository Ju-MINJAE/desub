import { Button } from '@/app/components/ui/Button';
import TextButton from '@/app/components/ui/TextButton';
import PricingTooltip from '../ui/pricing/PricingTooltip';
import '@/styles/pricing.css';

const Membership = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center pt-[20rem] pb-[13.3rem]">
      <h2 className="font-normal text-[4rem] mb-20 self-start text-left ml-[13.5rem]">Pricing</h2>
      <div className="relative">
        <div className="price-box rounded-[4rem] border pt-[4.1rem] px-[19.1rem] pb-[3.8rem]">
          <p className="text-[5rem] font-bold leading-[7.5rem]">standard</p>
          <p className="text-[1.8rem] font-bold mb-[7.2rem]">monthly</p>
          <p className="mb-[2.3rem]">
            <strong className="text-[5rem] font-bold">1,750,000원</strong>
            <span className="text-[3rem] font-light month"> / Month</span>
          </p>

          <div className="text-left mb-[1.5rem]">
            <p className="text-[1.5rem] font-light mb-[2.5rem]">Free 1 week trial</p>
            <ul className="text-[2rem]">
              <li>1일 최대 1건 요청 가능</li>
              <li>48시간 이내 작업물 전달</li>
              <li>(작업 범위에 따라 순차적 확장 추가 작업 진행)</li>
              <li>수정 무제한</li>
              <li>구독 취소 및 일시정지 언제든 가능</li>
            </ul>
          </div>

          <ul className="task-list text-left text-[2.5rem] mb-[9.2rem]">
            <li>UIUX</li>
            <li>E-commerce</li>
            <li>Branding</li>
            <li>Printing</li>
            <li>Social contents</li>
            <li>Prduct design</li>
            <li>3D contents</li>
            <li>
              All design assets from <PricingTooltip />
            </li>
          </ul>

          <Button
            size="default"
            type="button"
            variant="green"
            className="w-[48.1rem] h-[8.5rem] text-[3rem]"
          >
            check-in
          </Button>
        </div>
        <TextButton href="주소값" className="link-btn">
          일시정지/구독취소/환불 규정 확인하기
        </TextButton>
      </div>
    </div>
  );
};

export default Membership;

import { useState } from 'react';
import { Button } from '../ui/Button';
import { useAppDispatch } from '@/hooks/redux/hooks';
import { setSubscriptionStatus } from '../../../store/subscriptionStatusSlice';
import { Alert } from '../ui/Alert';
import Image from 'next/image';

const Unsubscribed = () => {
  const dispatch = useAppDispatch();
  const [subscriptionModal, setSubscriptionModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState<UnSubscriptionReason[]>([]);
  const [isEtc, setIsEtc] = useState(false);
  const [etcContents, setEtcContents] = useState('');
  const [warningMessage, setWarningMessage] = useState('');

  const handleSubscriptionStatus = () => {
    dispatch(setSubscriptionStatus('paused'));
  };

  type UnSubscriptionReason = {
    id: string;
    label: string;
    contents?: string;
  };

  const unSubscriptionReasons: UnSubscriptionReason[] = [
    { id: 'expensive', label: '가격이 비싸서' },
    { id: 'quality', label: '퀄리티가 마음에 들지 않아서' },
    { id: 'communication', label: '소통이 느려서' },
    { id: 'hiring', label: '정직원을 구하는 것이 더 편해서' },
    { id: 'budget', label: '회사예산이 줄어들어서' },
    { id: 'etc', label: '기타' },
  ];

  const handleSelectedReason = (item: UnSubscriptionReason) => {
    setWarningMessage('');
    setSelectedReason(prev => {
      const isSelected = prev.some(reason => reason.id === item.id);
      if (isSelected) {
        if (item.id === 'etc') setIsEtc(false);
        return prev.filter(reason => reason.id !== item.id);
      } else {
        if (prev.length >= 3) {
          setWarningMessage('구독취소 사유는 최대 3개까지 선택 가능합니다.');
          return prev;
        }
        if (item.id === 'etc') {
          setIsEtc(true);
          return [...prev, { ...item, contents: etcContents }];
        }
        return [...prev, item];
      }
    });
  };

  const handleEtcContents = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    setEtcContents(content);
    if (content.trim() !== '') {
      setWarningMessage('');
    }
    setSelectedReason(prev =>
      prev.map(reason => (reason.id === 'etc' ? { ...reason, contents: content } : reason)),
    );
  };

  const handleSubmit = () => {
    if (selectedReason.length === 0) {
      setWarningMessage('구독취소 사유를 선택해주세요.');
      return;
    }
    if (isEtc && etcContents.trim() === '') {
      setWarningMessage('기타 사유를 입력해주세요.');
      return;
    }
    console.log('제출된 사유:', selectedReason);
  };

  return (
    <div>
      <div className="flex w-[40.1rem] justify-between">
        {subscriptionModal && (
          <Alert
            buttonText="구독취소"
            childrenBottom={
              <div className="w-full h-[40rem] pt-[4rem] flex flex-col">
                <div className="flex flex-col gap-2">
                  {unSubscriptionReasons.map(item => (
                    <label key={item.id} className="flex items-center space-x-[2.3rem]">
                      <input
                        type="checkbox"
                        checked={selectedReason.some(reason => reason.id === item.id)}
                        onChange={() => handleSelectedReason(item)}
                        className="peer hidden"
                      />
                      <span className="w-10 h-10 border-2 border-black rounded-sm peer-checked:bg-primary peer-checked:border-black"></span>
                      <span className="text-[2rem]">{item.label}</span>
                    </label>
                  ))}
                </div>
                {isEtc && (
                  <textarea
                    className="w-full h-[10rem] border border-black p-[1rem] mt-[1rem]"
                    onChange={handleEtcContents}
                    value={etcContents}
                    placeholder="여기에 구독취소 사유를 작성해주세요."
                  ></textarea>
                )}
                {warningMessage && (
                  <div className="text-red text-[1.6rem] mt-[1rem] text-left">{warningMessage}</div>
                )}
              </div>
            }
            childrenTop={
              <>
                벌써 떠나시나요? 다시 오실거죠?
                <br />
                구독취소 사유를 알려주시면 서비스 개선에 참고하겠습니다.
              </>
            }
            size="normal"
            variant="green"
            onClose={() => setSubscriptionModal(false)}
            onSubmit={handleSubmit}
            className="w-[70rem] h-[60rem]"
          />
        )}
        <p className="text-[5rem] font-bold hover:underline hover:decoration-2">구독중</p>
        <Button
          className="w-[14.7rem] h-[6rem] font-bold text-[1.8rem] flex justify-center items-center gap-[0.6rem]"
          size="small"
          variant="outline"
          onClick={handleSubscriptionStatus}
        >
          <Image src="/icons/pause-circle.svg" alt="" width={24} height={24} />
          일시정지
        </Button>
      </div>
      <p className="text-[1.8rem] font-extrabold mt-[1.8rem]">~2025.06.12 / D-593일 남음</p>
      <div className="mt-[9.3rem]">
        <button onClick={() => setSubscriptionModal(true)} className="text-[1.8rem] underline">
          구독취소
        </button>
      </div>
    </div>
  );
};

export default Unsubscribed;

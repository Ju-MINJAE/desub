'use client';

import type React from 'react';

import { useState } from 'react';
import { Alert } from '../ui/Alert';
import { Confirm } from '../ui/Confirm';
import { type UnSubscriptionReason, unSubscriptionReasons } from '@/constants/unSubscription';

interface UnsubscriptionProps {
  onUnsubscribe: () => void;
  nextBillDate: string;
}

const Unsubscription: React.FC<UnsubscriptionProps> = ({ onUnsubscribe, nextBillDate }) => {
  const [firstCheckModal, setFirstCheckModal] = useState(false);
  const [subscriptionModal, setSubscriptionModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState<UnSubscriptionReason[]>([]);
  const [isEtc, setIsEtc] = useState(false);
  const [etcContents, setEtcContents] = useState('');
  const [warningMessage, setWarningMessage] = useState('');
  const [lastCheckModal, setLastCheckModal] = useState(false);

  // First modal
  const handleFirstCheck = () => {
    setFirstCheckModal(false);
    setSubscriptionModal(true);
    setSelectedReason([]);
    setIsEtc(false);
    setEtcContents('');
    setWarningMessage('');
  };

  // Second modal
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

  // Second modal 'etc' reason
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

  // Second modal final submit
  const handleSubscriptionReasonSubmit = () => {
    if (selectedReason.length === 0) {
      setWarningMessage('구독취소 사유를 선택해주세요.');
      return;
    }
    if (isEtc && etcContents.trim() === '') {
      setWarningMessage('기타 사유를 입력해주세요.');
      return;
    }
    console.log(selectedReason);
    setSubscriptionModal(false);
    setLastCheckModal(true);
  };

  // Second modal close button
  const handleSubscriptionReasonModalClose = () => {
    setSubscriptionModal(false);
    setSelectedReason([]);
    setIsEtc(false);
    setEtcContents('');
    setWarningMessage('');
  };

  // Last modal final submit
  const handleLastCheckSubmit = () => {
    setLastCheckModal(false);
    onUnsubscribe();
  };

  // Last modal close button
  const handleLastCheckModalClose = () => {
    setLastCheckModal(prev => !prev);
  };

  return (
    <>
      <button onClick={() => setFirstCheckModal(true)} className="text-[1.8rem] underline">
        구독취소
      </button>
      {firstCheckModal && (
        <Confirm
          buttonText1="구독유지"
          buttonText2="구독취소"
          contents={
            <p className="mt-[1.6rem]">
              구독을 취소하면 {nextBillDate}에
              <br />
              결제되지 않습니다.
            </p>
          }
          title="정말 구독을 취소하시겠습니까?"
          variant1="outline"
          variant2="green"
          onClose={() => setFirstCheckModal(false)}
          onCancel={() => setFirstCheckModal(false)}
          onSubmit={handleFirstCheck}
        />
      )}
      {subscriptionModal && (
        <Alert
          buttonText="구독취소"
          contents={
            <div className="pt-[4rem] pb-[4rem] flex flex-col gap-[2rem]">
              <div className="flex flex-col gap-2">
                {unSubscriptionReasons.map(item => (
                  <label key={item.id} className="flex items-center gap-[0.9rem]">
                    <input
                      type="checkbox"
                      checked={selectedReason.some(reason => reason.id === item.id)}
                      onChange={() => handleSelectedReason(item)}
                      className="peer hidden"
                    />
                    <span className="w-[2.3rem] h-[2.3rem] border-2 border-black rounded-sm peer-checked:bg-black peer-checked:border-black"></span>
                    <span className="text-[1.6rem]">{item.label}</span>
                  </label>
                ))}
              </div>
              {isEtc && (
                <textarea
                  className="w-full h-[20.7rem] border border-black p-[1rem]"
                  onChange={handleEtcContents}
                  value={etcContents}
                  placeholder="여기에 구독취소 사유를 작성해주세요."
                ></textarea>
              )}
              {warningMessage && (
                <div className="text-red text-[1.6rem] text-left">{warningMessage}</div>
              )}
            </div>
          }
          title={
            <>
              벌써 떠나시나요? 다시 오실거죠?
              <br />
              구독취소 사유를 알려주시면 서비스 개선에 참고하겠습니다.
            </>
          }
          size="normal"
          variant="green"
          onClose={() => handleSubscriptionReasonModalClose()}
          onSubmit={handleSubscriptionReasonSubmit}
          className="w-[60rem] min-h-[53.7rem]"
        />
      )}
      {lastCheckModal && (
        <Alert
          buttonText="확인"
          title={<p>구독 취소가 완료되었습니다.</p>}
          size="full"
          variant="outline"
          onClose={() => handleLastCheckModalClose()}
          onSubmit={handleLastCheckSubmit}
        />
      )}
    </>
  );
};

export default Unsubscription;

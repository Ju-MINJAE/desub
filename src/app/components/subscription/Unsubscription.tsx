'use client';

import type React from 'react';

import { useState } from 'react';
import { Alert } from '../ui/Alert';
import { Confirm } from '../ui/Confirm';
import { UnSubscriptionReason, SubscriptionCancelReason } from '@/types/profiles';
import { selectedReasonsInitialValue, unSubscriptionReasons } from '@/constants/unSubscription';
import { useAppSelector } from '@/hooks/redux/hooks';
import { updateSubStatus } from '@/store/userDataSlice';
import { useAppDispatch } from '@/hooks/redux/hooks';

interface UnsubscriptionProps {
  onUnsubscribe: (subscribedPlanId: number, selectedReasons: SubscriptionCancelReason) => void;
  nextBillDate: string;
}

const Unsubscription: React.FC<UnsubscriptionProps> = ({ onUnsubscribe, nextBillDate }) => {
  const [firstCheckModal, setFirstCheckModal] = useState(false);
  const [subscriptionModal, setSubscriptionModal] = useState(false);
  const [selectedReasons, setSelectedReasons] = useState(selectedReasonsInitialValue);
  const [isOther, setIsOther] = useState(false);
  const [otherContents, setOtherContents] = useState('');
  const [warningMessage, setWarningMessage] = useState('');
  const [lastCheckModal, setLastCheckModal] = useState(false);
  const userData = useAppSelector(state => state.userData);

  // First modal
  const handleFirstCheck = () => {
    setFirstCheckModal(false);
    setSubscriptionModal(true);
    setSelectedReasons(selectedReasonsInitialValue);
    setIsOther(false);
    setOtherContents('');
    setWarningMessage('');
  };

  // Second modal
  const handleSelectedReason = (item: UnSubscriptionReason) => {
    setWarningMessage('');
    setSelectedReasons(prev => {
      const isSelected = prev.cancelled_reason.includes(item.id);

      if (isSelected) {
        if (item.id === 'other') {
          setIsOther(false);
        }
        return {
          ...prev,
          cancelled_reason: prev.cancelled_reason.filter(reason => reason !== item.id),
        };
      } else {
        if (prev.cancelled_reason.length >= 3) {
          setWarningMessage('구독취소 사유는 최대 3개까지 선택 가능합니다.');
          return prev;
        }
        if (item.id === 'other') {
          setIsOther(true);
          return {
            ...prev,
            cancelled_reason: [...prev.cancelled_reason, item.id],
            other_reason: otherContents,
          };
        }
        return {
          ...prev,
          cancelled_reason: [...prev.cancelled_reason, item.id],
        };
      }
    });
  };

  // Second modal 'etc' reason
  const handleOtherContents = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    setOtherContents(content);
    if (content.trim() !== '') {
      setWarningMessage('');
    }
    setSelectedReasons(prev => ({
      ...prev,
      other_reason: content,
    }));
  };

  // Second modal final submit
  const handleSubscriptionReasonSubmit = () => {
    if (selectedReasons.cancelled_reason.length === 0) {
      setWarningMessage('구독취소 사유를 선택해주세요.');
      return;
    }
    if (isOther && otherContents.trim() === '') {
      setWarningMessage('기타 사유를 입력해주세요.');
      return;
    }
    setSubscriptionModal(false);
    setLastCheckModal(true);
  };

  // Second modal close button
  const handleSubscriptionReasonModalClose = () => {
    setSubscriptionModal(false);
    setSelectedReasons(selectedReasonsInitialValue);
    setIsOther(false);
    setOtherContents('');
    setWarningMessage('');
  };

  // Last modal final submit
  const handleLastCheckSubmit = () => {
    setLastCheckModal(false);
    const subscribedPlanId = userData.subscription_info.plan_id;
    onUnsubscribe(subscribedPlanId, selectedReasons);
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
                      checked={selectedReasons.cancelled_reason.includes(item.id)}
                      onChange={() => handleSelectedReason(item)}
                      className="peer hidden"
                    />
                    <span className="w-[2.3rem] h-[2.3rem] border-2 border-black rounded-sm peer-checked:bg-black peer-checked:border-black"></span>
                    <span className="text-[1.6rem]">{item.label}</span>
                  </label>
                ))}
              </div>
              {isOther && (
                <textarea
                  className="w-full h-[20.7rem] border border-black p-[1rem]"
                  onChange={handleOtherContents}
                  value={otherContents}
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

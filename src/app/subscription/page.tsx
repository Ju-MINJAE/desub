'use client';

import type React from 'react';
import { BackButton } from '@/app/components/ui/BackButton';
import { Button } from '../components/ui/Button';
import TextButton from '../components/ui/TextButton';
import { useState, useEffect, useMemo } from 'react';
import SubscriptionsStatus from '../components/subscription/SubscriptionsStatus';
import SubscriptionActive from '../components/subscription/SubscriptionActive';
import SubscriptionPaused from '../components/subscription/SubscriptionPaused';
import { SimpleAlert } from '../components/ui/SimpleAlert';
import Image from 'next/image';
import { Alert } from '../components/ui/Alert';
import Rating from 'react-rating';
import '../../styles/review.css';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/hooks/redux/hooks';
import { getUserSession, clearUserSession } from '../actions/serverAction';
import { getSubscriptionHistory, SubscriptionHistoryItem } from '@/api/subscription';
import { formatDate } from '../../utils/dateUtils';
import { postReview } from '@/api/review';
import useSubStatus from '@/hooks/useSubStatus';
import LoadingWrapper from '../components/ui/LoadingWrapper';
import { getProfileImage } from '@/utils/Profile';
import { usePathname } from 'next/navigation';
import { useAppDispatch } from '@/hooks/redux/hooks';
import { logoutUser } from '@/api/auth';
import { logout } from '@/store/authslice';
import { clearUserData } from '@/store/userDataSlice';

const Subscription = () => {
  const [subscriptionStatusModal, setSubscriptionStatusModal] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [review, setReview] = useState({
    rating: 0,
    content: '',
  });
  const [reviewContents, setReviewContents] = useState('');
  const [warningMessage, setWarningMessage] = useState('');
  const [lastCheckModal, setLastCheckModal] = useState(false);
  const [isBlinking, setIsBlinking] = useState<boolean>(true);
  const [history, setHistory] = useState<SubscriptionHistoryItem[]>([]);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  // 유저정보
  const userData = useAppSelector(state => state.userData);
  // 구독현황
  const subscriptionData = useSubStatus();
  const userSubStatue = subscriptionData?.status.sub_status;

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { accessToken } = await getUserSession();
        if (!accessToken) return;
        const response = await getSubscriptionHistory(accessToken);
        if (response.status === 'success' && response.data) {
          setHistory(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchHistory();
  }, []);

  const handleStarHover = () => {
    setIsBlinking(false);
  };

  const translateStatus = (status: string) => {
    switch (status) {
      case 'renewal':
        return '결제';
      case 'cancel':
        return '취소';
      case 'pause':
        return '일시정지';
      case 'restarted':
        return '재개';
      case 'refund_pending':
        return '구독 취소 요청';
      default:
        return status;
    }
  };

  const reversedHistory = useMemo(() => [...history].reverse(), [history]);

  const handleStarLeave = () => {
    if (!reviewModal) {
      setIsBlinking(true);
    }
  };

  const handleStatus = () => {
    switch (userSubStatue) {
      case 'active':
        return <SubscriptionActive />;
      case 'paused':
        return <SubscriptionPaused />;
      default:
        return <SubscriptionsStatus />;
    }
  };

  // 리뷰 관리
  const handleReviewContents = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    setReviewContents(content);
    setWarningMessage('');
    setReview(prev => ({ ...prev, content: content }));
  };

  const openReviewModal = () => {
    setIsBlinking(false);
    setReviewModal(true);
  };

  const closeReviewModal = () => {
    resetReview();
    if (!reviewModal) {
      setIsBlinking(true);
    }
  };

  // 리뷰 리셋
  const resetReview = () => {
    setIsBlinking(true);
    setReviewModal(false);
    setWarningMessage('');
    setReview({
      rating: 0,
      content: '',
    });
  };

  // 최종 제출
  const handleReviewSubmit = async () => {
    try {
      if (reviewContents.trim() === '') {
        setWarningMessage('후기 내용을 입력해주세요.');
        return;
      }

      await postReview(review);

      resetReview();
      setLastCheckModal(true);
    } catch (error) {
      console.error('리뷰 제출 실패:', error);
    }
  };

  const goToTrelloLink = () => (window.location.href = 'https://trello.com/b/8NZhWTI4/desub');

  // 임시 로그아웃
  const logoutSession = async () => {
    const { accessToken, refreshToken } = await getUserSession();
    if (accessToken && refreshToken) {
      try {
        await logoutUser(accessToken, refreshToken); // 로그아웃 api
        router.push('/'); // 홈으로 이동
      } catch (error) {
        console.error('로그아웃 실패', error);
      }
    }
    await clearUserSession(); // 토큰 삭제
    dispatch(logout());
    dispatch(clearUserData());
  };

  // 프로필사진
  const serverImage = userData?.img_url || '';
  const displayedImage = getProfileImage(serverImage);
  const isDefaultImage = displayedImage === '/icons/profile.svg';
  return (
    <LoadingWrapper>
      <div className="h-full overflow-x-hidden">
        {reviewModal && (
          <Alert
            buttonText="작성완료"
            contents={
              <div className="pb-[4rem] flex flex-col items-center gap-[2rem]">
                <Rating
                  emptySymbol={<p className="text-[5rem]">☆</p>}
                  fullSymbol={<p className="text-[5rem]">★</p>}
                  initialRating={review.rating}
                  onChange={value => setReview(prev => ({ ...prev, rating: value }))}
                  className="flex gap-2"
                />
                <textarea
                  className="w-full h-[20.7rem] border border-black p-[1rem]"
                  onChange={handleReviewContents}
                  value={review.content}
                  placeholder="여기에 솔직한 후기를 작성해주세요."
                ></textarea>
                {warningMessage && (
                  <div className=" w-full">
                    <p className="text-red text-[1.6rem]">{warningMessage}</p>
                  </div>
                )}
              </div>
            }
            title={
              <>
                구독기간 중 언제든 리뷰를 작성하실 수 있어요.
                <br />
                작성된 리뷰는 서비스 개선에 참고하겠습니다.
              </>
            }
            size="normal"
            variant="green"
            onClose={closeReviewModal}
            onSubmit={handleReviewSubmit}
            className="w-[60rem] min-h-[60.4rem]"
          />
        )}
        {lastCheckModal && (
          <Alert
            buttonText="확인"
            title={<p>소중한 의견 감사합니다.</p>}
            size="full"
            variant="outline"
            onClose={() => setLastCheckModal(false)}
            onSubmit={() => setLastCheckModal(false)}
          />
        )}
        {subscriptionStatusModal && (
          <SimpleAlert
            contents={
              <div className="w-full h-[15rem] flex flex-col overflow-hidden">
                <div className="flex pb-[1.9rem] text-[1.5rem] font-bold">
                  <div className="w-3/4">
                    <p>일시</p>
                  </div>
                  <div className="w-1/4">
                    <p>내용</p>
                  </div>
                </div>
                <div className="flex flex-col gap-[1.5rem] text-[1.5rem] overflow-y-auto">
                  {reversedHistory.map((item, index) => (
                    <div key={index} className="flex items-center text-medium">
                      <div className="w-3/4">{formatDate(item.change_date)}</div>
                      <div className="w-1/4">{translateStatus(item.status)}</div>
                    </div>
                  ))}
                </div>
              </div>
            }
            title="구독현황 변경 및 결제이력"
            onClose={() => setSubscriptionStatusModal(false)}
            className="w-[50rem] max-h-[30.5rem]"
          />
        )}
        <div className="pt-[4.7rem] px-[4.7rem] flex justify-between">
          <BackButton text="my subscription" />
          {userSubStatue !== 'none' && (
            <div className="flex items-center">
              <Button
                onClick={openReviewModal}
                className={`!w-[11.9rem] h-[3.3rem] text-[1.5rem] ${isBlinking ? 'blinking' : ''}`}
                size="small"
                variant="outline"
              >
                리뷰 작성하기
              </Button>
              <div
                onMouseEnter={handleStarHover}
                onMouseLeave={handleStarLeave}
                className="cursor-pointer"
                onClick={openReviewModal}
              >
                <Image
                  src="/icons/review.svg"
                  alt="review_button"
                  width={176.99}
                  height={68}
                  className="hidden md:block"
                />
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 h-auto md:h-[71.2rem] mt-[2.9rem] px-[5.8rem]">
          {/* 프로필 */}
          <div className="flex flex-col gap-[9.9rem] pb-10 md:pb-0 border-b md:border-r">
            <div className="mt-[5.5rem] flex flex-col items-center">
              <div className="w-[19.8rem] h-[19.8rem] rounded-full relative z-[-10]">
                {/* 구독페이지 기본 프사 */}
                {pathname === '/subscription' && isDefaultImage ? (
                  <div className="w-full h-full flex justify-center items-center rounded-full">
                    <span className="bg-[#d9d9d9] w-[19.8rem] h-[19.8rem] rounded-full flex"></span>
                  </div>
                ) : (
                  <Image
                    src={displayedImage}
                    alt="프로필이미지"
                    className="w-full h-full object-cover rounded-full"
                    width={198}
                    height={198}
                  />
                )}
              </div>

              <div className="mt-[3rem] md:mt-[2rem] text-center">
                <p className="text-[3rem] md:text-[5rem] font-bold italic">wassup!</p>
                <div className="flex gap-[1rem]">
                  <p className="text-[4rem] md:text-[5rem] font-bold flex whitespace-nowrap">
                    <span className="underline pr-3 md:pr-5">{userData?.name}</span> 님
                  </p>

                  <button>
                    <Image
                      src="/icons/setting.svg"
                      alt="desub_myInfo"
                      width={24}
                      height={24}
                      onClick={() => router.push('/myInfo')}
                    />
                  </button>
                </div>
              </div>

              <div className="flex gap-[2rem] md:gap-[2.7rem] mt-[5rem]">
                <Button
                  className="w-full px-5 whitespace-nowrap md:w-[20.9rem] h-[4rem] md:h-[6rem] border border-black font-bold text-[1.6rem] md:text-[1.8rem]"
                  size="small"
                  variant="green"
                  onClick={() => router.push('/workRequest')}
                >
                  작업 요청하기
                </Button>

                <Button
                  className="w-full px-5 md:w-[20.9rem] h-[4rem] md:h-[6rem] border border-black font-bold text-[1.6rem] md:text-[1.8rem] flex justify-center items-center gap-[1.7rem]"
                  size="small"
                  variant="outline"
                  onClick={goToTrelloLink}
                >
                  Workspace
                  <Image
                    src="/icons/workSpace.svg"
                    alt="desub_workspace"
                    width={24}
                    height={24}
                    className="hidden md:flex"
                  />
                </Button>
              </div>
              <TextButton href="/HowToRequest" className="mt-[4rem] text-[1.5rem]">
                <span className="font-bold">how to request</span>
              </TextButton>
            </div>
            <div>
              <button className="font-bold text-[1.5rem] text-[#878787]" onClick={logoutSession}>
                logout
              </button>
            </div>
          </div>

          <div className="flex flex-col md:pl-[5.9rem] justify-center min-h-[50rem] md:h-auto">
            <div className="flex md:flex-row flex-col justify-between mt-[0.9rem]">
              <p className="font-bold">Status</p>
              <button
                className="font-bold underline mr-auto md:mr-0 md:pt-0 pt-5"
                onClick={() => setSubscriptionStatusModal(true)}
              >
                구독현황 변경 및 결제이력
              </button>
            </div>
            {handleStatus()}
          </div>
        </div>
      </div>
    </LoadingWrapper>
  );
};

export default Subscription;

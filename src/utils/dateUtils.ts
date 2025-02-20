import { format, parseISO, differenceInDays, addSeconds } from 'date-fns';
import { ko } from 'date-fns/locale';

export const formatDate = (dateString: string): string => {
  return format(parseISO(dateString), 'yyyy년 MM월 dd일 HH:mm', { locale: ko });
};

export const formatDateShort = (dateString: string): string => {
  return format(parseISO(dateString), 'yyyy.MM.dd', { locale: ko });
};

export const calculateRemainingDays = (endDateString: string): number => {
  const endDate = parseISO(endDateString);
  const now = new Date();
  return differenceInDays(endDate, now);
};

export const formatRemainingBillDate = (
  remainingBillDate: string,
): { formattedDate: string; daysRemaining: number } => {
  const now = new Date();
  const [days, time] = remainingBillDate.split(' ');
  const [hours, minutes, seconds] = time.split(':');
  const remainingSeconds =
    Number.parseInt(days) * 86400 +
    Number.parseInt(hours) * 3600 +
    Number.parseInt(minutes) * 60 +
    Number.parseFloat(seconds);
  const remainingDate = addSeconds(now, remainingSeconds);
  const formattedDate = format(remainingDate, 'yyyy.MM.dd');
  const daysRemaining = differenceInDays(remainingDate, now);

  return { formattedDate, daysRemaining };
};

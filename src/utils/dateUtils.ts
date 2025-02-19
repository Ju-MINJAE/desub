import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

export const formatDate = (dateString: string): string => {
  return format(parseISO(dateString), 'yyyy년 MM월 dd일 HH:mm', { locale: ko });
};

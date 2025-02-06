export const formatPhoneNumber = (value: string): string => {
  // 숫자만 남기기
  const numbers = value.replace(/\D/g, '');

  if (numbers.length <= 3) return numbers; // 010
  if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`; // 010-1234
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`; // 010-1234-5678
};

export const formatTime = (seconds: number | null): string => {
  if (seconds === null) return '04:00'; // 초기 상태
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

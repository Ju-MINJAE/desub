export const maskEmail = (email: string): string => {
  if (!email) return '이메일 정보 없음';

  const [local, domain] = email.split('@'); // 로컬 부분과 도메인 부분 분리
  const domainParts = domain.split('.'); // 도메인에서 `.com` 앞 부분을 분리

  // `@` 앞부분 마스킹 (첫 2글자 유지, 이후 `*`로 대체)
  const maskedLocal =
    local.length > 2
      ? local.substring(0, 2) + '*'.repeat(local.length - 2)
      : '*'.repeat(local.length);

  // `.com` 앞부분 마스킹 (마지막 3글자만 `*` 처리)
  const maskedDomain =
    domainParts[0].length > 3
      ? domainParts[0].substring(0, domainParts[0].length - 3) + '***'
      : '***';

  return `${maskedLocal}@${maskedDomain}.${domainParts.slice(1).join('.')}`;
};

import { z } from 'zod';

export const WithdrawalSchema = z.object({
  reason: z
    .string()
    .trim()
    .min(1, '탈퇴 사유를 입력해주세요.') // 빈 값 방지
});

export type WithdrawalValue = z.infer<typeof WithdrawalSchema>;

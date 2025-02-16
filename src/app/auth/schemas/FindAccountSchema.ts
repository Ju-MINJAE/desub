import { z } from 'zod';

export const FindAccountSchema = z.object({
  phone_number: z
    .string()
    .regex(/^01[0-9]-\d{3,4}-\d{4}$/, '휴대폰번호 유형에 맞게 입력해주세요.')
    .nonempty('휴대폰 번호를 입력해주세요.'),
});

export type FindAccountValue = z.infer<typeof FindAccountSchema>;

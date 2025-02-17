import { z } from 'zod';

export const FindPasswordSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .refine(email => email.includes('@'), {
      message: '이메일 주소에는 "@"가 포함되어야 합니다.',
    }),
});

export type FindPasswordValue = z.infer<typeof FindPasswordSchema>;

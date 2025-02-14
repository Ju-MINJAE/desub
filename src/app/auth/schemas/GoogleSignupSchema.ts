import { z } from 'zod';

export const GoogleSignupSchema = z.object({
  phone_number: z
    .string()
    .regex(/^01[0-9]-\d{3,4}-\d{4}$/, '휴대폰번호 유형에 맞게 입력해주세요.')
    .nonempty('휴대폰 번호를 입력해주세요.'),

  phone_auth: z.string().nonempty('휴대폰 인증 번호를 입력해주세요.'),

  isPhoneVerified: z.boolean().refine(value => value === true, {
    message: '휴대폰 인증이 필요합니다.',
  }),
});

export type GoogleSignupValues = z.infer<typeof GoogleSignupSchema>;

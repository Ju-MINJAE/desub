import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, '이메일을 입력해주세요.').email('이메일 형식에 맞게 입력해주세요.'),
  password: z.string().min(10, '비밀번호는 최소 10자 이상이어야 합니다.'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

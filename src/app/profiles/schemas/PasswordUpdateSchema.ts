import { z } from 'zod';

export const PasswordUpdateSchema = z
  .object({
    password: z
      .string()
      .min(1, '비밀번호를 입력해주세요.')
      .min(10, '비밀번호는 최소 10자 이상이어야 합니다.')
      .max(20, '비밀번호는 최대 20자까지만 허용됩니다.')
      .refine(
        password => {
          const hasUpperCase = /[A-Z]/.test(password);
          const hasLowerCase = /[a-z]/.test(password);
          const hasNumber = /\d/.test(password);
          const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
          return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
        },
        {
          message: '비밀번호는 영문 대/소문자, 숫자, 특수문자를 모두 포함해야 합니다.',
        },
      ),
    newPassword: z
      .string()
      .min(1, '비밀번호를 입력해주세요.')
      .min(10, '비밀번호는 최소 10자 이상이어야 합니다.')
      .max(20, '비밀번호는 최대 20자까지만 허용됩니다.')
      .refine(
        password => {
          const hasUpperCase = /[A-Z]/.test(password);
          const hasLowerCase = /[a-z]/.test(password);
          const hasNumber = /\d/.test(password);
          const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
          return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
        },
        {
          message: '비밀번호는 영문 대/소문자, 숫자, 특수문자를 모두 포함해야 합니다.',
        },
      ),
    newPassword_confirm: z.string().min(1, '비밀번호를 입력해주세요.'),
  })
  .refine(data => data.newPassword === data.newPassword_confirm, {
    message: '동일한 비밀번호를 입력해주세요.',
    path: ['newPassword_confirm'],
  });

export type PasswordUpdateValue = z.infer<typeof PasswordUpdateSchema>;

import { z } from 'zod';

// 프로필 이메일, 이름
export const ProfilesUserInfoSchema = z.object({
  email: z.string(),

  username: z
    .string()
    .min(1, '이름을 입력해주세요.')
    .min(2, '이름은 최소 2자 이상이어야 합니다.')
    .max(30, '이름은 최대 30자까지만 허용됩니다.')
    .regex(
      /^[^\p{Emoji_Presentation}\p{Symbol}\p{Punctuation}\s]*$/u,
      '이름에는 이모티콘, 기호, 공백이 포함될 수 없습니다.',
    ),
});

export type ProfilesUserInfoFormData = z.infer<typeof ProfilesUserInfoSchema>;

// 프로필 이전 비밀번호, 신규 비밀번호, 신규 비밀번호 재입력
export const ProfilesPasswordSchema = z
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

    password_confirm: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
  })
  .refine(data => data.password === data.password_confirm, {
    message: '동일한 비밀번호를 입력해주세요.',
    path: ['password_confirm'],
  });

export type ProfilesPasswordFormData = z.infer<typeof ProfilesPasswordSchema>;

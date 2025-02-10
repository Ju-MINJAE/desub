import { z } from 'zod';

export const SignUpSchema = z
  .object({
    email: z
      .string()
      .min(1, '이메일을 입력해주세요.')
      .refine(email => email.includes('@'), {
        message: '이메일 주소에는 "@"가 포함되어야 합니다.',
      }),

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
    username: z
      .string()
      .min(1, '이름을 입력해주세요.')
      .min(2, '이름은 최소 2자 이상이어야 합니다.')
      .max(30, '이름은 최대 30자까지만 허용됩니다.')
      .regex(
        /^[^\p{Emoji_Presentation}\p{Symbol}\p{Punctuation}\s]*$/u,
        '이름에는 이모티콘, 기호, 공백이 포함될 수 없습니다.',
      ),

    phone_number: z
      .string()
      .regex(/^01[0-9]-\d{3,4}-\d{4}$/, '휴대폰번호 유형에 맞게 입력해주세요.'),

    /** 휴대폰 인증 필수 */

    phone_auth: z.string(),

    isPhoneVerified: z.boolean().refine(value => value === true, {
      message: '휴대폰 인증이 필요합니다.',
    }),

    /** 약관 필수 2개 (terms, privacy) + 선택 1개 (marketing) */
    terms: z.boolean().refine(value => value === true, {
      message: '이용약관에 동의해야 가입이 가능합니다.',
    }),
    privacy: z.boolean().refine(value => value === true, {
      message: '개인정보처리방침에 동의해야 가입이 가능합니다.',
    }),
    marketing: z.boolean().optional(), // 선택 약관

    /** 이메일 기입여부 확인 필수 */
    isEmailAvailable: z.boolean().refine(value => value === true, {
      message: '이메일 가입여부 확인이 필요합니다.',
    }),
  })
  .refine(data => data.password === data.password_confirm, {
    message: '동일한 비밀번호를 입력해주세요.',
    path: ['password_confirm'], // ✅ password_confirm 필드에 에러 메시지를 표시하도록 설정
  });

export type SignupFormData = z.infer<typeof SignUpSchema>;

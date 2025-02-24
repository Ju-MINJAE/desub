import { z } from 'zod';

export const UserProfileUpdateSchema = z
  .object({
    name: z.string().default('').optional(),
    image: z.instanceof(File).optional().nullable(), // 🔥 파일만 허용 (URL 제거)
  })
  .superRefine((data, ctx) => {
    if (!data.name?.trim() && !data.image) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '프로필 이미지나 이름 중 하나 이상 변경해 주세요.',
        path: ['name'], // 오류를 name 필드에 표시
      });
    }
  });

export type UserProfileUpdateValue = z.infer<typeof UserProfileUpdateSchema>;

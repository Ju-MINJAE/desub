import { z } from 'zod';

export const UserProfileUpdateSchema = z
  .object({
    name: z.string().optional(),
    image: z.instanceof(File).optional(),
  })
  .refine(data => data.name || data.image, {
    message: '이름 또는 프로필 이미지를 수정해야 합니다.',
    path: ['name'],
  });

export type UserProfileUpdateValue = z.infer<typeof UserProfileUpdateSchema>;

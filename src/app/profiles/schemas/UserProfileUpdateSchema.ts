import { z } from 'zod';

export const UserProfileUpdateSchema = (initialName: string, initialImageUrl: string) => {
  return z
    .object({
      name: z.string().default(''),
      image: z
        .union([z.instanceof(File), z.string()])
        .optional()
        .nullable(),
    })
    .superRefine((data, ctx) => {
      const isNameChanged = data.name !== initialName;

      let isImageChanged = false;
      if (data.image instanceof File) {
        isImageChanged = true;
      } else if (typeof data.image === 'string') {
        isImageChanged = data.image !== initialImageUrl;
      }

      if (!(isNameChanged || isImageChanged)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '프로필 이미지 또는 이름 중 하나 이상을 변경해 주세요.',
          path: ['name'],
        });
      }
    });
};

export type UserProfileUpdateValue = z.infer<ReturnType<typeof UserProfileUpdateSchema>>;

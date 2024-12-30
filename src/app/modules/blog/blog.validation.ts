import { z } from 'zod';

const blogPostValidationSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must not exceed 100 characters'),
  content: z.string().min(10, 'Content must be at least 10 characters long'),

  isPublished: z.boolean().default(true),

});

export const blogValidations = {
  blogPostValidationSchema,
};

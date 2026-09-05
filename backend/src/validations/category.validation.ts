import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1).max(100),
  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9-]+$/),
  description: z.string().max(500).optional(),
  image: z.string().url().optional(),
  isActive: z.boolean().optional(),
});

export const updateCategorySchema = createCategorySchema.partial();

export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;

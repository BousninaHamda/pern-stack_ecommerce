import { z } from "zod";

const productStatusEnum = z.enum(["ACTIVE", "OUT_OF_STOCK", "DRAFT"]);

const decimalSchema = z.coerce
  .number()
  .refine((value) => Number.isFinite(value), {
    message: "Must be a valid decimal value",
  });

export const createProductSchema = z.object({
  name: z.string().min(1).max(100),
  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9-]+$/),
  description: z.string().max(2000).optional(),
  price: decimalSchema.refine((value) => value > 0, {
    message: "Price must be greater than 0",
  }),
  compareAtPrice: decimalSchema
    .optional()
    .refine((value) => value === undefined || value > 0, {
      message: "Compare at price must be greater than 0",
    }),
  status: productStatusEnum.default("DRAFT"),
  categoryId: z.string().uuid(),
});

export const updateProductSchema = createProductSchema.partial();

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;

import { z } from "zod";

export const createProductVariantSchema = z.object({
  productId: z.string().uuid(),
  stock: z.number().int().nonnegative(),
  image: z.string().url().optional(),
  color: z.string().max(50).optional(),
  sku: z.string().max(100),
  size: z.string().max(5).optional(),
});

export const updateProductVariantSchema = createProductVariantSchema.partial();

export type CreateProductVariantInput = z.infer<
  typeof createProductVariantSchema
>;
export type UpdateProductVariantInput = z.infer<
  typeof updateProductVariantSchema
>;

import { ProductVariant } from "../../generated/prisma/client";

import * as productVariantRepository from "../repositories/productVariant.repository";

import {
  CreateProductVariantInput,
  UpdateProductVariantInput,
} from "../validations/productVariant.validation";

export const getProductVariantById = async (
  id: string,
): Promise<ProductVariant | null> => {
  return await productVariantRepository.getProductVariantById(id);
};

export const getAllProductVariants = async (): Promise<ProductVariant[]> => {
  return await productVariantRepository.getAllProductVariants();
};

export const createProductVariant = async (
  data: CreateProductVariantInput,
): Promise<ProductVariant> => {
  return await productVariantRepository.createProductVariant(data);
};

export const updateProductVariant = async (
  data: UpdateProductVariantInput,
  id: string,
): Promise<ProductVariant> => {
  return await productVariantRepository.updateProductVariant(data, id);
};

export const deleteProductVariant = async (
  id: string,
): Promise<ProductVariant> => {
  return await productVariantRepository.deleteProductVariant(id);
};

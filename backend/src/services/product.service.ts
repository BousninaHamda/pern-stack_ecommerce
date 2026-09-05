import { Product } from "../../generated/prisma/client";

import {
  CreateProductInput,
  UpdateProductInput,
} from "../validations/product.validation";

import * as productRepository from "../repositories/product.repository";

export const getProductBySlug = async (
  slug: string,
): Promise<Product | null> => {
  return await productRepository.getProductBySlug(slug);
};

export const getAllProducts = async (): Promise<Product[]> => {
  return await productRepository.getAllProducts();
};

export const createProduct = async (
  data: CreateProductInput,
): Promise<Product> => {
  return await productRepository.createProduct(data);
};

export const updateProduct = async (
  data: UpdateProductInput,
  slug: string,
): Promise<Product> => {
  return await productRepository.updateProduct(data, slug);
};

export const deleteProduct = async (slug: string): Promise<Product> => {
  return await productRepository.deleteProduct(slug);
};

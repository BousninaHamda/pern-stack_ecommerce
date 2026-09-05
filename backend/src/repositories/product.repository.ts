import { prisma } from "../config/database";
import { Product } from "../../generated/prisma/client";

export const getProductBySlug = async (
  slug: string,
): Promise<Product | null> => {
  return prisma.product.findUnique({
    where: {
      slug,
    },
  });
};

export const getAllProducts = async (): Promise<Product[]> => {
  return prisma.product.findMany();
};

interface CreateProductData {
  name: string;
  slug: string;
  description?: string;
  price: number;
  compareAtPrice?: number;
  status?: "ACTIVE" | "OUT_OF_STOCK" | "DRAFT";
  categoryId: string;
}

type UpdateProductData = Partial<CreateProductData>;

export const createProduct = async (
  data: CreateProductData,
): Promise<Product> => {
  return await prisma.product.create({
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description,
      price: data.price,
      compareAtPrice: data.compareAtPrice,
      status: data.status,
      categoryId: data.categoryId,
    },
  });
};

export const updateProduct = async (
  data: UpdateProductData,
  slug: string,
): Promise<Product> => {
  return await prisma.product.update({
    where: {
      slug,
    },
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description,
      price: data.price,
      compareAtPrice: data.compareAtPrice,
      status: data.status,
      categoryId: data.categoryId,
    },
  });
};

export const deleteProduct = async (slug: string): Promise<Product> => {
  return await prisma.product.delete({
    where: {
      slug,
    },
  });
};

import { prisma } from "../config/database";
import { ProductVariant } from "../../generated/prisma/client";

export const getProductVariantById = async (
  id: string,
): Promise<ProductVariant | null> => {
  return prisma.productVariant.findUnique({
    where: {
      id,
    },
  });
};

export const getAllProductVariants = async (): Promise<ProductVariant[]> => {
  return prisma.productVariant.findMany();
};

interface CreateProductVariantData {
  productId: string;
  sku: string;
  stock: number;
  color?: string;
  image?: string;
  size?: string;
}

type UpdateProductVariantData = Partial<CreateProductVariantData>;

export const createProductVariant = async (
  data: CreateProductVariantData,
): Promise<ProductVariant> => {
  return await prisma.productVariant.create({
    data: {
      productId: data.productId,
      sku: data.sku ?? "",
      stock: data.stock,
      color: data.color,
      image: data.image,
      size: data.size,
    },
  });
};

export const updateProductVariant = async (
  data: UpdateProductVariantData,
  id: string,
): Promise<ProductVariant> => {
  return await prisma.productVariant.update({
    where: {
      id,
    },
    data: {
      productId: data.productId,
      sku: data.sku ?? "",
      stock: data.stock,
      color: data.color,
      image: data.image,
      size: data.size,
    },
  });
};

export const deleteProductVariant = async (
  id: string,
): Promise<ProductVariant> => {
  return await prisma.productVariant.delete({
    where: {
      id,
    },
  });
};

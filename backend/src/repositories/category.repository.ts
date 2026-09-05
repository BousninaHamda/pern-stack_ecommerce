import { prisma } from "../config/database";
import { Category } from "../../generated/prisma/client";

export const getCategoryBySlug = async (
  slug: string,
): Promise<Category | null> => {
  return prisma.category.findUnique({
    where: {
      slug,
    },
  });
};

export const getAllCategories = async (): Promise<Category[]> => {
  return prisma.category.findMany();
};

interface CreateCategoryData {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  isActive?: boolean;
}

export const createCategory = async (
  data: CreateCategoryData,
): Promise<Category> => {
  return await prisma.category.create({
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description,
      image: data.image,
      isActive: data.isActive,
    },
  });
};

export const updateCategory = async (
  data: CreateCategoryData,
  slug: string,
): Promise<Category> => {
  return await prisma.category.update({
    where: {
      slug,
    },
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description,
      image: data.image,
      isActive: data.isActive,
    },
  });
};

export const deleteCategory = async (slug: string): Promise<Category> => {
  return await prisma.category.delete({
    where: {
      slug,
    },
  });
};

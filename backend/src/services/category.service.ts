import { Category } from "../../generated/prisma/client";
import {
  getCategoryBySlug,
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} from "../repositories/category.repository";

import { CreateCategoryInput } from "../validations/category.validation";

export const create = async (data: CreateCategoryInput): Promise<Category> => {
  const existingCategory = await getCategoryBySlug(data.slug);

  if (existingCategory) {
    throw new Error("Category with this slug already exists");
  }

  return createCategory(data);
};

export const getAll = async (): Promise<Category[]> => {
  return getAllCategories();
};

export const update = async (
  data: CreateCategoryInput,
  slug: string,
): Promise<Category> => {
  const existingCategory = await getCategoryBySlug(slug);

  if (!existingCategory) {
    throw new Error("Category not found");
  }

  return updateCategory(data, slug);
};

export const remove = async (slug: string) => {
  const existingCategory = await getCategoryBySlug(slug);

  if (existingCategory) {
    return deleteCategory(slug);
  }
};

export const getBySlug = async (slug: string): Promise<Category | null> => {
  return getCategoryBySlug(slug);
};

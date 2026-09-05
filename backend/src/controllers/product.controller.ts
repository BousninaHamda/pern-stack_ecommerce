import { Request, Response } from "express";
import { ZodError } from "zod";
import * as productService from "../services/product.service";

import {
  createProductSchema,
  updateProductSchema,
} from "../validations/product.validation";

export const getProductBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    if (typeof slug !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid product slug",
      });
    }

    const product = await productService.getProductBySlug(slug);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const validatedData = createProductSchema.parse(req.body);
    const product = await productService.createProduct(validatedData);

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        errors: error.issues,
      });
    }

    if (error instanceof Error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();

    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    if (typeof slug !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid product slug",
      });
    }

    const validatedData = updateProductSchema.parse(req.body);
    const product = await productService.updateProduct(validatedData, slug);

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        errors: error.issues,
      });
    }

    if (error instanceof Error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    if (typeof slug !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid product slug",
      });
    }

    await productService.deleteProduct(slug);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

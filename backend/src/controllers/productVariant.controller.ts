import { Request, Response } from "express";
import * as productVariantService from "../services/productVariant.service";

import {
  createProductVariantSchema,
  updateProductVariantSchema,
} from "../validations/productVariant.validation";

export const getProductVariants = async (req: Request, res: Response) => {
  try {
    const productVariants = await productVariantService.getAllProductVariants();

    return res.status(200).json({
      success: true,
      data: productVariants,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getProductVariantById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const productVariant = await productVariantService.getProductVariantById(
      id as string,
    );

    if (!productVariant) {
      return res.status(404).json({
        success: false,
        message: "Product variant not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: productVariant,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const createProductVariant = async (req: Request, res: Response) => {
  try {
    const validatedData = createProductVariantSchema.parse(req.body);
    const productVariant =
      await productVariantService.createProductVariant(validatedData);

    return res.status(201).json({
      success: true,
      message: "Product variant created successfully",
      data: productVariant,
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

export const updateProductVariant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData = updateProductVariantSchema.parse(req.body);
    const productVariant = await productVariantService.updateProductVariant(
      validatedData,
      id as string,
    );

    return res.status(200).json({
      success: true,
      message: "Product variant updated successfully",
      data: productVariant,
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

export const deleteProductVariant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const productVariant = await productVariantService.deleteProductVariant(
      id as string,
    );

    return res.status(200).json({
      success: true,
      message: "Product variant deleted successfully",
      data: productVariant,
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

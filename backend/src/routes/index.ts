import { Router } from "express";
import authRoutes from "./auth.route";
import categoryRoutes from "./category.route";
import productRoutes from "./product.route";
import productVariantRoutes from "./productVariant.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);
router.use("/product-variants", productVariantRoutes);

export default router;

import { Router } from "express";
import authRoutes from "./auth.routes";
import categoryRoutes from "./category.route";
import productRoutes from "./product.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);

export default router;

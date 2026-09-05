import { Router } from "express";
import * as productController from "../controllers/product.controller";

const router = Router();

router.post("/new", productController.createProduct);
router.get("/", productController.getProducts);
router.get("/:slug", productController.getProductBySlug);
router.put("/:slug", productController.updateProduct);
router.delete("/:slug", productController.deleteProduct);

export default router;

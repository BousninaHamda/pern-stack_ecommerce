import { Router } from "express";
import * as productVariant from "../controllers/productVariant.controller";

const router = Router();

router.get("/", productVariant.getProductVariants);
router.post("/new", productVariant.createProductVariant);
router.get("/:id", productVariant.getProductVariantById);
router.put("/:id", productVariant.updateProductVariant);
router.delete("/:id", productVariant.deleteProductVariant);

export default router;

import { Router } from "express";
import * as categoryController from "../controllers/category.controller";

const router = Router();

router.post("/new", categoryController.createCategory);
router.get("/", categoryController.getCategories);
router.put("/:slug", categoryController.updateCategory);
router.delete("/:slug", categoryController.deleteCategory);

export default router;

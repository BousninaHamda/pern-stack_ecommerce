import { Router } from "express";
import * as authController from "../controllers/auth.controller";

const router = Router();

router.post("/Register", authController.register);
router.post("/Login", authController.login);

export default router;

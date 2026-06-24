import { Router } from "express";
import { signupFormGet } from "../controllers/authController.js";

const router = Router();

router.get("/signup", signupFormGet);

export default router;
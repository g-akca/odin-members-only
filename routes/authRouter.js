import { Router } from "express";
import { signupFormGet } from "../controllers/authController.js";

const authRouter = Router();

authRouter.get("/signup", signupFormGet);

export default authRouter;
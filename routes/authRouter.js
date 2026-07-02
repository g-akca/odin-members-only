import { Router } from "express";
import { signupFormGet, signupFormPost, validateSignup } from "../controllers/authController.js";

const authRouter = Router();

authRouter.get("/signup", signupFormGet);

authRouter.post("/signup", validateSignup, signupFormPost);

export default authRouter;
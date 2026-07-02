import { Router } from "express";
import { signupFormGet, signupFormPost, validateSignup, loginFormGet } from "../controllers/authController.js";

const authRouter = Router();

authRouter.get("/signup", signupFormGet);

authRouter.post("/signup", validateSignup, signupFormPost);

authRouter.get("/login", loginFormGet);

export default authRouter;
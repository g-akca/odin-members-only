import { Router } from "express";
import { signupFormGet, signupFormPost, validateSignup, loginFormGet, loginFormPost } from "../controllers/authController.js";

const authRouter = Router();

authRouter.get("/signup", signupFormGet);

authRouter.post("/signup", validateSignup, signupFormPost);

authRouter.get("/login", loginFormGet);

authRouter.post("/login", loginFormPost);

export default authRouter;
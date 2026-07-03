import { Router } from "express";
import { signupFormGet, signupFormPost, validateSignup, loginFormGet, loginFormPost, membershipFormGet } from "../controllers/authController.js";

const authRouter = Router();

authRouter.get("/signup", signupFormGet);
authRouter.post("/signup", validateSignup, signupFormPost);

authRouter.get("/login", loginFormGet);
authRouter.post("/login", loginFormPost);

authRouter.get("/membership", membershipFormGet);

export default authRouter;
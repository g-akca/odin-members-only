import { Router } from "express";
import { signupFormGet, signupFormPost, validateSignup, loginFormGet, loginFormPost, membershipFormGet, membershipFormPost, validateMembership } from "../controllers/authController.js";

const authRouter = Router();

authRouter.get("/signup", signupFormGet);
authRouter.post("/signup", validateSignup, signupFormPost);

authRouter.get("/login", loginFormGet);
authRouter.post("/login", loginFormPost);

authRouter.get("/membership", membershipFormGet);
authRouter.post("/membership", validateMembership, membershipFormPost);

export default authRouter;
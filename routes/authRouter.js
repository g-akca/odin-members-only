import { Router } from "express";
import { signupFormGet, signupFormPost } from "../controllers/authController.js";

const authRouter = Router();

authRouter.get("/signup", signupFormGet);

authRouter.post("/signup", signupFormPost);

export default authRouter;
import { Router } from "express";
import { signupFormGet, signupFormPost, validateSignup, loginFormGet, loginFormPost, logoutGet, membershipFormGet, membershipFormPost, validateMembership } from "../controllers/authController.js";

const authRouter = Router();

// Middleware to ensure only guests (non-authenticated users) can access signup/login
function guestOnly(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }

  next();
}

// Middleware to ensure only authenticated users can access logout
function userOnly(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect("/");
  }

  next();
}

// Middleware to ensure only non-member authenticated users can access membership form
function nonMemberOnly(req, res, next) {
  if (!req.isAuthenticated() || req.user.is_member) {
    return res.redirect("/");
  }

  next();
}

authRouter.get("/signup", guestOnly, signupFormGet);
authRouter.post("/signup", guestOnly, validateSignup, signupFormPost);

authRouter.get("/login", guestOnly, loginFormGet);
authRouter.post("/login", guestOnly, loginFormPost);

authRouter.get("/logout", userOnly, logoutGet);

authRouter.get("/membership", nonMemberOnly, membershipFormGet);
authRouter.post("/membership", nonMemberOnly, validateMembership, membershipFormPost);

export default authRouter;
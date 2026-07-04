import { Router } from "express";
import { messageFormGet } from "../controllers/messagesController.js";

const messagesRouter = Router();

// Middleware to ensure only authenticated users can access new message form
function userOnly(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect("/");
  }

  next();
}

messagesRouter.get("/new", userOnly, messageFormGet);

export default messagesRouter;
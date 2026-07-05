import { Router } from "express";
import { messageFormGet, messageFormPost, validateMessage, messageDeletePost } from "../controllers/messagesController.js";

const messagesRouter = Router();

// Middleware to ensure only authenticated users can access new message form
function userOnly(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect("/");
  }

  next();
}

// Middleware to ensure only admin users can delete messages
function adminOnly(req, res, next) {
  if (!req.isAuthenticated() || !req.user.is_admin) {
    return res.redirect("/");
  }

  next();
}

messagesRouter.get("/new", userOnly, messageFormGet);

messagesRouter.post("/", userOnly, validateMessage, messageFormPost);

messagesRouter.post("/:id/delete", adminOnly, messageDeletePost);

export default messagesRouter;
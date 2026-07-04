import { body, validationResult, matchedData } from "express-validator";
import { insertMessage } from "../db/queries.js";

function messageFormGet(req, res) {
  res.render("newMessage");
}

const validateMessage = [
  body("title").trim()
    .notEmpty().withMessage("Please enter a title."),
  body("message").trim()
    .notEmpty().withMessage("Please enter a message."),
];

async function messageFormPost(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("newMessage", {
        errors: errors.array(),
        values: req.body
      });
    }

    const { title, message } = matchedData(req);
    const timestamp = new Date();

    insertMessage(req.user.id, title, message, timestamp);
    res.redirect("/");
  } catch (err) {
    next(err);
  }
}

export { messageFormGet, messageFormPost, validateMessage };
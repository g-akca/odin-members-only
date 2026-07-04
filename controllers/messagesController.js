import { body, validationResult, matchedData } from "express-validator";

function messageFormGet(req, res) {
  res.render("newMessage");
}

const validateMessage = [
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

    const { message } = matchedData(req);

    // DB query to be added here
    res.redirect("/");
  } catch (err) {
    next(err);
  }
}

export { messageFormGet, messageFormPost, validateMessage };
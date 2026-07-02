import { body, validationResult, matchedData } from "express-validator";
import bcrypt from "bcryptjs";
import { insertUser } from "../db/queries.js";

function signupFormGet(req, res) {
  res.render("signup");
}

const validateSignup = [
  body("firstName").trim()
    .notEmpty().withMessage("First name can not be empty.")
    .isAlpha().withMessage("First name must only contain alphabet letters."),
  body("lastName").trim()
    .notEmpty().withMessage("Last name can not be empty.")
    .isAlpha().withMessage("Last name must only contain alphabet letters."),
];

async function signupFormPost(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("signup", {
        errors: errors.array()
      });
    }

    const { firstName, lastName, email, password } = matchedData(req);
    const hashedPassword = await bcrypt.hash(password, 10);

    await insertUser(firstName, lastName, email, hashedPassword);
    res.redirect("/");
  } catch (err) {
    next(err);
  }
}

export { signupFormGet, signupFormPost, validateSignup };
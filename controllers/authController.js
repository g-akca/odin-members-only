import { body, validationResult, matchedData } from "express-validator";
import bcrypt from "bcryptjs";
import passport from "passport";
import { insertUser, makeUserMember } from "../db/queries.js";

// Signup
function signupFormGet(req, res) {
  res.render("signup");
}

const validateSignup = [
  body("firstName").trim()
    .notEmpty().withMessage("First name is required.")
    .isAlpha().withMessage("First name must only contain alphabet letters."),
  body("lastName").trim()
    .notEmpty().withMessage("Last name is required.")
    .isAlpha().withMessage("Last name must only contain alphabet letters."),
  body("email").trim()
    .normalizeEmail().notEmpty().withMessage("Email is required.")
    .isEmail().withMessage("Please provide a valid email address."),
  body("password").trim()
    .notEmpty().withMessage("Password is required.")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long."),
  body("confirmPassword").trim()
    .notEmpty().withMessage("Please confirm your password.")
    .custom((value, { req }) => value === req.body.password).withMessage("Passwords do not match."),
];

async function signupFormPost(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("signup", {
        errors: errors.array(),
        values: req.body 
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

// Login
function loginFormGet(req, res) {
  res.render("login");
}

function loginFormPost(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).render("login", {
        errors: [{ msg: info.message }],
        values: { email: req.body.email }
      });
    }
    
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  })(req, res, next);
}

// Membership
function membershipFormGet(req, res) {
  res.render("membership");
}

const validateMembership = [
  body("secretCode").trim()
  .notEmpty().withMessage("Please enter a code.")
  .custom((value, { req }) => value === "neko").withMessage("Oops, incorrect code! Please try again."),
];

function membershipFormPost(req, res, next) {
  try {
    const errors = validationResult(validateMembership);

    if (!errors.isEmpty()) {
      return res.status(400).render("membership", {
        errors: errors.array(),
      });
    }

    await makeUserMember(req.user.id);
    res.redirect("/");
  } catch (err) {
    next(err);
  }
}

export { signupFormGet, signupFormPost, validateSignup, loginFormGet, loginFormPost, membershipFormGet, membershipFormPost, validateMembership };
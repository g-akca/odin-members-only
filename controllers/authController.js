import bcrypt from "bcryptjs";
import { insertUser } from "../db/queries.js";

function signupFormGet(req, res) {
  res.render("signup");
}

async function signupFormPost(req, res, next) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await insertUser(req.body.first_name, req.body.last_name, req.body.email, hashedPassword);
    res.redirect("/");
  } catch (err) {
    next(err);
  }
}

export { signupFormGet, signupFormPost };
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import { getAllMessages, getUserByEmail, getUserById } from "./db/queries.js";
import authRouter from "./routes/authRouter.js";
import messagesRouter from "./routes/messagesRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Settings
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const { rows } = await getUserByEmail(email);
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect email address entered." });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password entered." })
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await getUserById(id);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Routes
app.get("/", async (req, res, next) => {
  try {
    const { rows } = await getAllMessages();

    res.render("index", { messages: rows });
  } catch (err) {
    next(err);
  }
});

app.use(authRouter);

app.use("/messages", messagesRouter);

// Centralized error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }

  console.log(`Listening on port ${PORT}!`);
});
import { fileURLToPath } from "url";
import * as path from "path";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import { engine } from "express-handlebars";
import methodOverride from "./config/es6-wrapper.mjs";
import connectDB from "./config/db.js";
import { indexRouter } from "./routes/index.js";
import { authRouter } from "./routes/auth.js";
import { storyRouter } from "./routes/stories.js";
import passport from "passport";
import configurePassport from "./config/passport.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import { formatDate, truncate, editIcon, select } from "./helpers/hbs.js";
import { ensureAuth } from "./middleware/auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Passport Configuration
configurePassport(passport);

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Method override
app.use(
  methodOverride((req, res) => {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.engine(
  ".hbs",
  engine({
    helpers: {
      formatDate,
      truncate,
      editIcon,
      select,
    },
    defaultLayout: "main",
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");
app.set("views", "./views");

// Sessions
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Set global variable in order to make it accessible in hbs
app.use((req, res, next) => {
  res.locals.loggedUser = req.user || null;
  next();
});

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/stories", ensureAuth, storyRouter);

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

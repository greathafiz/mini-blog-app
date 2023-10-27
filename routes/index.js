import express from "express";
const router = express.Router();
import { ensureAuth, ensureGuest } from "../middleware/auth.js";

router.get("/", ensureGuest, (req, res) => {
  res.render("login", {
    layout: "login",
  });
});

router.get("/dashboard", ensureAuth, (req, res) => {
  res.render("dashboard", {
    name: req.user.firstName,
  });
});

export { router as indexRouter };

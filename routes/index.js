import express from "express";
const router = express.Router();
import { ensureAuth, ensureGuest } from "../middleware/auth.js";
import Story from "../models/Story.js";

router.get("/", ensureGuest, (req, res) => {
  res.render("login", {
    layout: "login",
  });
});

router.get("/dashboard", ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({author: req.user.id}).lean()
    res.render("dashboard", {
      name: req.user.firstName,
      stories
    });
  } catch (error) {
    res.render('error/500')
  }
});

export { router as indexRouter };

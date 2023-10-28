import express from "express";
const router = express.Router();
import { ensureAuth, ensureGuest } from "../middleware/auth.js";
import { showDashboard, showLoginPage } from "../controllers/index.js";

// Top level routes

router.get("/", ensureGuest, showLoginPage);

router.get("/dashboard", ensureAuth, showDashboard);

export { router as indexRouter };

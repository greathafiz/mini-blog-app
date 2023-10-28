import express from "express";
const router = express.Router();
import { ensureAuth } from "../middleware/auth.js";

import Story from "../models/Story.js";

router.get("/add", ensureAuth, (req, res) => {
  res.render("stories/add");
});

router.post("/", ensureAuth, async (req, res) => {
  try {
    req.body.author = req.user.id;
    await Story.create(req.body);
    res.redirect("dashboard");
  } catch (error) {
    console.error(error);
    res.render("error/500");
  }
});

router.get("/", ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ status: "public" })
      .populate("author")
      .sort({ createdAt: -1 })
      .lean();
    res.render("stories/index", {
      stories,
    });
  } catch (error) {
    console.error(error);
    res.render("error/500");
  }
});

router.get("/:id", ensureAuth, async (req, res) => {
  try {
    let story = await Story.findById(req.params.id).populate("author").lean();

    if (!story) {
      return res.render("error/404");
    }

    res.render("stories/show", {
      story,
    });
  } catch (error) {
    console.error(error);
    res.render("error/404");
  }
});

router.get("/edit/:id", ensureAuth, async (req, res) => {
  try {
    const story = await Story.findOne({
      _id: req.params.id,
    }).lean();

    if (!story) {
      return res.render("error/404");
    }

    if (story.author.toString() !== req.user.id) {
      res.redirect("/stories");
    } else {
      res.render("stories/edit", {
        story,
      });
    }
  } catch (error) {
    console.error(error);
    res.render("error/500");
  }
});

router.put("/:id", ensureAuth, async (req, res) => {
  try {
    let story = await Story.findById(req.params.id).lean();

    if (!story) {
      return res.render("error/404");
    }

    if (story.author.toString() !== req.user.id) {
      res.redirect("/stories");
    } else {
      story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      });
      res.redirect("/dashboard");
    }
  } catch (error) {
    console.error(error);
    res.render("error/500");
  }
});

router.delete("/:id", ensureAuth, async (req, res) => {
  try {
    await Story.findByIdAndRemove(req.params.id);
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.render("error/500");
  }
});

router.get("/user/:userId", ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({
      author: req.params.userId,
      status: "public",
    })
      .populate("author")
      .lean();

    res.render("stories/index", {
      stories,
    });
  } catch (error) {
    console.error(error);
    res.render("error/500");
  }
});

export { router as storyRouter };

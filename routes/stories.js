import express from "express";
const router = express.Router();
import {
  showAddPage,
  createNewStory,
  showPublicStories,
  showSingleStory,
  showEditPage,
  updateStory,
  deleteStory,
  showUserStories,
} from "../controllers/stories.js";

router.get("/add", showAddPage);

router.route("/").post(createNewStory).get(showPublicStories);

router.route("/:id").get(showSingleStory).put(updateStory).delete(deleteStory);

router.get("/edit/:id", showEditPage);

router.get("/user/:userId", showUserStories);

export { router as storyRouter };

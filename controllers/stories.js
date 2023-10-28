import Story from "../models/Story.js";

export const showAddPage = (req, res) => {
  res.render("stories/add");
};

export const createNewStory = async (req, res) => {
  try {
    req.body.author = req.user.id;
    await Story.create(req.body);
    res.redirect("dashboard");
  } catch (error) {
    console.error(error);
    res.render("error/500");
  }
};

export const showPublicStories = async (req, res) => {
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
};

export const showSingleStory = async (req, res) => {
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
};

export const showEditPage = async (req, res) => {
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
};

export const updateStory = async (req, res) => {
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
};

export const deleteStory = async (req, res) => {
  try {
    let story = await Story.findById(req.params.id).lean();

    if (!story) {
      return res.render("error/404");
    }

    if (story.author.toString() !== req.user.id) {
      res.redirect("/stories");
    } else {
      await Story.deleteOne({ _id: req.params.id });
      res.redirect("/dashboard");
    }
  } catch (error) {
    console.error(error);
    res.render("error/500");
  }
};

export const showUserStories = async (req, res) => {
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
};

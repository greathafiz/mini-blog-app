import Story from "../models/Story.js";

export const showLoginPage = (req, res) => {
  res.render("login", {
    layout: "login",
  });
};

export const showDashboard = async (req, res) => {
  try {
    const stories = await Story.find({ author: req.user.id }).lean();
    res.render("dashboard", {
      name: req.user.firstName,
      stories,
    });
  } catch (error) {
    res.render("error/500");
  }
};

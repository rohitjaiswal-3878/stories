const express = require("express");
const router = express.Router();
const Stories = require("../models/Stories");
const User = require("../models/User");
const { authMiddleware } = require("../middlewares/auth");

router.post("/create", authMiddleware, async (req, res, next) => {
  try {
    const { userId, slides } = req.body;
    const user = await User.findOne({ _id: userId });
    if (user) {
      await Stories.create({
        userId,
        slides,
      });

      return res.json({ msg: "Story created successfully!" });
    } else {
      return res.status(400).json({ msg: "User does not exixts!" });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/all", authMiddleware, async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const result = await Stories.find({ userId });
    return res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id/slide/:slideId", async (req, res, next) => {
  try {
    const { id: storyId, slideId } = req.params;
    const story = await Stories.findOne({ _id: storyId });

    let visitIndex = -1;
    story.slides.forEach((slide, index) => {
      if (slide._id.toString() == slideId) {
        visitIndex = index;
      }
    });
    return res.json({ slides: [...story.slides], visitIndex });
  } catch (error) {
    next(error);
  }
});

router.get("/stories/:filter", async (req, res, next) => {
  try {
    const filter = req.params.filter;
    const filterArr = filter.split(",");
    const categories = ["medical", "fruits", "world", "india"];

    let result = {};
    async function getData(catArray) {
      for (const cat of catArray) {
        const data = await Stories.find({ "slides.category": cat });
        result = { ...result, [cat]: data };
      }
    }
    if (filter == "all") {
      await getData(categories);
    } else {
      await getData(filterArr);
    }
    return res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

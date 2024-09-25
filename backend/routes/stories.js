const express = require("express");
const router = express.Router();
const Stories = require("../models/Stories");
const User = require("../models/User");

router.post("/create", async (req, res, next) => {
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

router.get("/all", async (req, res, next) => {
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

    if (story.userId == req.body.userId) {
      let visitIndex = -1;
      story.slides.forEach((slide, index) => {
        if (slide._id.toString() == slideId) {
          visitIndex = index;
        }
      });
      return res.json({ slides: [...story.slides], visitIndex });
    } else {
      return res.status(403).json({ msg: "Access forbidden!" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;

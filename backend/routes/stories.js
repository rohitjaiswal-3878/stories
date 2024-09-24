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

module.exports = router;

const express = require("express");
const router = express.Router();
const { User, Blog, Comment } = require("../models");

router.get("/", (req, res) => {
  Blog.find().exec({}, (err, posts) => {
    res.status(201).json(posts.reverse());
  });
});

router.get("/random", (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  Blog.aggregate([{ $sample: { size: limit } }]).exec((err, posts) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(200).json(posts);
  });
});

router.get("/dashboard/:userId", (req, res) => {
  const userId = req.params.userId;

  User.find({ _id: userId }, (err, user) => {
    Blog.find({ userId }, (err, blogs) => {
      Comment.find({ userId }, (err, comments) => {
        res.status(201).json({ message: "dashboard", user, blogs, comments });
      });
    });
  });
});

module.exports = router;

require("dotenv").config();
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  region: process.env.BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});
const upload = multer(multer.memoryStorage());

router.post("/image", upload.single("image"), async (req, res) => {
  console.log(req.body);

  if (req.body.userId == undefined || req.body.blogId == undefined) {
    res.json({ message: "please provide a valid parameters" });
  } else {
    const Key = `images/${req.body.userId}/${req.body.blogId}/${req.file.originalname}`;

    const command = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key,
      Body: req.file.buffer,
      Contenttype: req.file.mimetype,
      ACL: "public-read",
    });

    await s3.send(command);

    res.status(201).json({
      success: 1,
      url: `https://kurenai-image-testing.s3.ap-south-1.amazonaws.com/${Key}`,
    });
  }
});

router.post("/titleImage", upload.single("image"), async (req, res) => {
  if (req.body.userId == undefined || req.body.blogId == undefined) {
    res.json({ message: "please provide a valid parameters" });
  } else {
    const Key = `images/${req.body.userId}/${req.body.blogId}/${req.file.originalname}`;

    const command = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key,
      Body: req.file.buffer,
      Contenttype: req.file.mimetype,
      ACL: "public-read",
    });

    await s3.send(command);

    res.status(201).json({
      success: 1,
      url: `https://kurenai-image-testing.s3.ap-south-1.amazonaws.com/${Key}`,
    });
  }
});

module.exports = router;

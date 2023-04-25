const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const passport = require("passport");
const nodemailer = require("nodemailer");

const userSchema = new mongoose.Schema({
  username: String,
  role: String,
  referral: Number,
  email: String,
  password: String,
  followers: Array,
  following: Array,
  recommendation: Array,
});
userSchema.plugin(passportLocalMongoose, {
  usernameQueryFields: ["username", "email"],
});

const blogSchema = new mongoose.Schema({
  title: String,
  keys: Array,
  body: Object,
  tags: Array,
  userId: String,
  viewCount: { type: Number, default: 0 },
  status: String,
  date: String,
  likes: Array,
  recommendation: Array,
  titleImage: String,
});

const commentSchema = new mongoose.Schema({
  userId: String,
  blogId: String,
  body: String,
  status: String,
  date: String,
});

const reviewSchema = new mongoose.Schema({
  blogId: String,
  userId: String,
  body: String,
  score: Number,
  date: String,
});

const userInfoSchema = new mongoose.Schema({
  userId: String,
  body: Object,
});

const competitionSchema = new mongoose.Schema({
  competitionName: String,
  blogId: Array,
  threshold: Number,
  prize: Number,
  status: String,
  startDate: String,
  endDate: String,
});

const rankingSchema = new mongoose.Schema({
  userId: String,
  blogId: String,
  viewCount: { type: Number, default: 0 },
  competitionId: String,
  rank: String,
  qulified: Boolean,
});

const referralSchema = new mongoose.Schema({
  userId: String,
  referralArray: Array,
  hisReferral: Number,
});

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

function toggle(arr, elem) {
  const index = arr.indexOf(elem);
  if (index !== -1) {
    arr.splice(index, 1);
  } else {
    arr.push(elem);
  }
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "autumnkurenai@gmail.com",
    pass: process.env.PASSWORD,
  },
});

const date = new Date().toLocaleDateString();
const User = new mongoose.model("User", userSchema);
const Blog = new mongoose.model("blog", blogSchema);
const Comment = new mongoose.model("comment", commentSchema);
const Review = new mongoose.model("review", reviewSchema);
const UserInfo = new mongoose.model("userinfo", userInfoSchema);
const Competition = new mongoose.model("competition", competitionSchema);
const Ranking = new mongoose.model("ranking", rankingSchema);
const Referral = new mongoose.model("raferral", referralSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = {
  date,
  User,
  Blog,
  Comment,
  corsOptions,
  Review,
  UserInfo,
  Competition,
  Ranking,
  Referral,
  toggle,
  transporter,
};

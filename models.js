const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const passport = require("passport");
const nodemailer = require('nodemailer');


const  userSchema = new mongoose.Schema({
    username:String,
    email:String,
    password: String,
    followers:Array,
    following:Array
  });
userSchema.plugin(passportLocalMongoose, {usernameQueryFields: ["username","email"]});


const  blogSchema = new mongoose.Schema({
  title:String,
  keys:Array,
  body:Object,
  userId:String,
  views:String,
  status:String,
  date:String,
  likes:Array
});

const  commentSchema = new mongoose.Schema({
  userId:String,
  blogId:String,
  body:String,
  status:String,
  date:String
});

const reviewSchema = new mongoose.Schema({
  blogId:String,
  userId:String,
  body:String,
  score:Number,
  date:String
})

const corsOptions = {
    origin:'*', 
    credentials:true, 
    optionSuccessStatus:200,
  }
  
  function toggle(arr, elem) {
    const index = arr.indexOf(elem);
    if (index !== -1) {
      arr.splice(index, 1);
    } else {
      arr.push(elem);
    }
  }
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'autumnkurenai@gmail.com',
      pass: 'hrihtjreflykyiqe'
    }
  });

  const date = new Date().toLocaleDateString();
  const User = new mongoose.model("User",userSchema);
  const Blog = new mongoose.model("blog",blogSchema);
  const Comment = new mongoose.model("comment",commentSchema);
  const Review = new mongoose.model("review", reviewSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

  
  module.exports = {
    date, User, Blog, Comment, corsOptions, Review, toggle, transporter
  }
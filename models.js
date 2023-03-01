const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const LocalStrategy = require('passport-local').Strategy;
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
});

const  commentSchema = new mongoose.Schema({
  userId:String,
  blogId:String,
  body:String,
  status:String,
  date:String
});

const likeSchema = new mongoose.Schema({
  blogId:String,
  likes: Object,
  count:Number
})

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
  
  
  function toggle(obj, value) {
    const keys = Object.keys(obj);
    const index = keys.findIndex(key => obj[key] === value);
    
    if (index !== -1) {
      delete obj[keys[index]];
    } else {
      let newKey = 1;
      while (obj.hasOwnProperty(newKey)) {
        newKey++;
      }
      obj[newKey] = value;
    }
  }

  // const transporter = nodemailer.createTransport({
  //   port: 587,
  //   host: "smtp.office365.com",
  //   auth: {
  //       user: 'dev.swayam@outlook.com',
  //       pass: process.env.PASSWORD,
  //   },
  // });
  
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
  const Like = new mongoose.model("like", likeSchema);
  const Review = new mongoose.model("review", reviewSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

  
  module.exports = {
    date, User, Blog, Comment, Like, corsOptions, Review, toggle, transporter
  }
const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const LocalStrategy = require('passport-local').Strategy;
const passport = require("passport");


const  userSchema = new mongoose.Schema({
    username:String,
    email:String,
    password: String,
    followers:Array,
    following:Array
  });
// userSchema.plugin(passportLocalMongoose);
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

  const date = new Date().toLocaleDateString();
  const User = new mongoose.model("User",userSchema);
  const Blog = new mongoose.model("blog",blogSchema);
  const Comment = new mongoose.model("comment",commentSchema);
  const Like = new mongoose.model("like", likeSchema);
  const Review = new mongoose.model("review", reviewSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// passport.use(new LocalStrategy({ 
//   usernameField: 'login', // the name of the field that will be used to identify the user (either username or email)
//   passwordField: 'password'
// }, function(login, password, done) {
//   User.findOne({ $or: [{ username: login }, { email: login }] }, function(err, user) {
//     if (err) { return done(err); }
//     if (!user) { return done(null, false, { message: 'Incorrect login.' }); }
//     if (!user.validPassword(password)) { return done(null, false, { message: 'Incorrect password.' }); }
//     return done(null, user);
//   });
// }
// ));

  
  module.exports = {
    date, User, Blog, Comment, Like, corsOptions, Review, toggle
  }
const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");


const  userSchema = new mongoose.Schema({
    username:String,
    email:String,
    password: String
  });
userSchema.plugin(passportLocalMongoose);

const  blogSchema = new mongoose.Schema({
  title:String,
  keys:Array,
  body:String,
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
  score:Number
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
  
  
  const User = new mongoose.model("User",userSchema);
  const Blog = new mongoose.model("blog",blogSchema);
  const Comment = new mongoose.model("comment",commentSchema);
  const Like = new mongoose.model("like", likeSchema);
  const Review = new mongoose.model("review", reviewSchema);
  
  module.exports = {
    User, Blog, Comment, Like, corsOptions, Review, toggle
  }
  
  
  












    // const likeSchema = new mongoose.Schema({
    //   userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: "User"
    //   },
    //   blogId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: "Blog"
    //   },
    //   like: {
    //     type: Boolean,
    //     required: true,
    //     default: true
    //   }
    // });
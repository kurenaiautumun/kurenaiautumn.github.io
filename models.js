const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");


const  userSchema = new mongoose.Schema({
    username:String,
    email:String,
    password: String
  });

userSchema.plugin(passportLocalMongoose);
const User = new mongoose.model("User",userSchema);

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
  
  // const likeSchema = new mongoose.Schema({
  //   userid:String,
  //   blogId: String,
  //   like:String,
  //   date:String
  // })

  const likeSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Blog"
    },
    like: {
      type: Boolean,
      required: true,
      default: true
    }
  });

  const corsOptions = {
    origin:'*', 
    credentials:true, 
    optionSuccessStatus:200,
  }



const Blog = new mongoose.model("blog",blogSchema);
const Comment = new mongoose.model("comment",commentSchema);
// const Like = new mongoose.model("like",likeSchema);
const Like = new mongoose.model("Like", likeSchema);


module.exports = {
    User, Blog, Comment, Like, corsOptions
}
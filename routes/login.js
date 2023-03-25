const express=require('express')
const router=express.Router()
const { User} = require('../models.js');
const passport = require("passport");



router.post("/login",function(req,res){
  console.log(req.body)
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });
     req.login(user, function(err){
      if(!err){
          passport.authenticate("local")(req,res,function(){
            User.findOne({$or:[{username:user.username},{email:user.username}]},(err,user)=>{
              res.status(201).json({message:"user login successfully",user});
            })
          })
      }else{
        res.status(404).json({message:"username or password is wrong"})
      }
     })
  })
  
  router.post('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.status(201).json({message:"user logout successfully"});
    });
  });

module.exports=router;
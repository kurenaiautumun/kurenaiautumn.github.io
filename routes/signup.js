const express=require('express')
const router=express.Router()
const { User } = require('../models.js');
const passport = require("passport");


router.post("/signup",function(req,res){
    User.register({username:req.body.username,email:req.body.email}, req.body.password,
      function(err,user){
      if(err){
        res.status(201).json({err:err});
      }else{
        passport.authenticate("local")(req,res,function(){
          res.status(201).json({message:"user signup successfully", user});
        })
      }
    })
});

module.exports=router;
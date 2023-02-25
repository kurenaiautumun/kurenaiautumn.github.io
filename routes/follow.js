const express=require('express')
const router=express.Router()
const { User} = require('../models.js');

router.get("/follow/:userId",(req,res)=>{
    const _id = req.params.userId;
    User.findOne({_id},(err,user)=>{
      if (err) throw err;
      const {followers , username, following} = user;
      res.status(201).json({message:"followers details",username, followers, following})
    })
  })

  router.post("/follow/:userId",(req,res)=>{
    const _id = req.params.userId;
    const {followers, following} = req.body;
    User.updateOne({_id}, 
      {$push:{followers,following}}, function (err, docs) {
        if (!err){
          res.status(201).json({message:"update succesfully",docs})
        }
      });
  })

  module.exports=router;

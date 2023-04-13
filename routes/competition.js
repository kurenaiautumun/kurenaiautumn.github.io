const express=require('express')
const router=express.Router()
const {Competition} = require('../models.js');


router.get("/competition",(req,res)=>{
    Competition.find({_id},(err,competition)=>{
        res.status(201).json(competition)
      })
  })

router.post("/competition",(req,res)=>{
    const {
    competitionName,
    blogId,
    threshold,
    prize,
    status,
    startDate,
    endDate
    } = req.body;

    const competition = new Competition({
        competitionName,
        blogId,
        threshold,
        prize,
        status,
        startDate,
        endDate
    })
    competition.save((err,competition)=>{
        if (err) throw err;
        res.status(201).json({message:"competition saved",competition});
    })
  })

  module.exports=router;
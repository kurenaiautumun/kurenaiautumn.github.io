const express=require('express')
const router=express.Router()
const {Ranking} = require('../models.js');


router.get("/ranking",(req,res)=>{
    Ranking.find({_id},(err,ranks)=>{
        res.status(201).json(ranks)
      })
  })

router.post("/ranking",(req,res)=>{
    const {
    userId,
    competitionId,
    blogId,
    rank,
    qulified,
    } = req.body;

    const ranking = new Ranking({
        userId,
        competitionId,
        blogId,
        rank,
        qulified,
    })
    ranking.save((err,ranks)=>{
        if (err) throw err;
        res.status(201).json({message:"competition saved",ranks});
    })
  })


module.exports=router;
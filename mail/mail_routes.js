const express = require('express');
const sendEmail = require('./mail');
router = express.Router()


router.post('/send', function(req, res){
    sendEmail(req.body.name);
    res.json('blog sent')
  });
  
  
  module.exports = router
const nodemailer = require('nodemailer');


// const transporter = nodemailer.createTransport({
//     port: 587,
//     host: "smtp.office365.com",
//     auth: {
//         user: 'dev.swayam@outlook.com',
//         pass: process.env.PASSWORD,
//     },
//   });

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'autumnkurenai@gmail.com',
      pass: 'hrihtjreflykyiqe'
    }
  });

  var mailData = {
    from: 'autumnkurenai@gmail.com',
    to: 'abhinavchaudhary10@gmail.com',
    subject: 'Sending Email mailer',
    template: 'sample',
    context: {                  // <=
      name: "Abhinav"
    }
    //text: 'That was easy!'
  };

//   const mailData = {
//     from:'dev.swayam@outlook.com',
//     to: '',
//     subject: req.body.name,
//     text:(`Email:${req.body.email}\nmessage:${req.body.message}`),
// };

transporter.sendMail(mailData, (error, info) => {
    if (error) {
        return console.log(error);
    }
    res.status(200).send({ message: "Mail send", message_id: info.messageId });
});

module.exports=router;

const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    port: 587,
    host: "smtp.office365.com",
    auth: {
        user: 'dev.swayam@outlook.com',
        pass: process.env.PASSWORD,
    },
  });

  const mailData = {
    from:'dev.swayam@outlook.com',
    to: '',
    subject: req.body.name,
    text:(`Email:${req.body.email}\nmessage:${req.body.message}`),
};

transporter.sendMail(mailData, (error, info) => {
    if (error) {
        return console.log(error);
    }
    res.status(200).send({ message: "Mail send", message_id: info.messageId });
});
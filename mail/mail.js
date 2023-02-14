var nodemailer = require('nodemailer');
const ejs = require('ejs');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'autumnkurenai@gmail.com',
    pass: 'hrihtjreflykyiqe'
  }
});

var mailOptions = {
  from: 'autumnkurenai@gmail.com',
  to: 'abhinavchaudhary10@gmail.com',
  subject: 'Sending Email mailer',
  template: 'sample',
  context: {                  // <=
    name: "Abhinav"
  }
  //text: 'That was easy!'
};

//transporter.sendMail(mailOptions, function(error, info){
//  if (error) {
//    console.log(error);
//  } else {
//    console.log('Email sent: ' + info.response);
//  }
//});

const sendEmail = (name) => {
  ejs.renderFile(__dirname + '/sample/sample.ejs', {name}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      var mailOptions = {
        from: 'autumnkurenai@gmail.com',
        to: 'abhinavchaudhary10@gmail.com',
        subject: 'Sending Email mailer',
        html: data
        }

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
      });
    }
  });
};

module.exports = sendEmail
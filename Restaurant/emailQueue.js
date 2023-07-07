const Queue = require('bull');
const nodemailer = require('nodemailer');

require('dotenv').config();

  // 1. Initiating the Queue
const sendMailQueue = new Queue('sendMail', {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }
});

console.log(sendMailQueue)

const options = {
  delay: 600, // 1 min in ms
  attempts: 2
};
// 2. Adding a Job to the Queue
// sendMailQueue.add(data);
// console.log("job added");


// 3. Consumer
sendMailQueue.process(async job => { 
  console.log("job processed");
  return sendMail(job.data); 
});

function sendMail(emailObj) {


  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD, // app password
    }
  });

  transporter.sendMail(emailObj, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  })
}

//Expoprt queue
module.exports=sendMailQueue

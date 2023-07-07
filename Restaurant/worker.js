const nodemailer = require('nodemailer');

const processEmailJob = async (job) => {
  try {
    const { to, subject, text } = job.data;

    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'walminiproject@gmail.com',
        pass: 'dzrqpmhgebrfiduh',
      },
    });

    // Configure the email options
    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject,
      text,
    };

    // Send the email using the transporter
    await transporter.sendMail(mailOptions);

    // Mark the job as completed
    return Promise.resolve();
  } catch (error) {
    console.error(error);

    // Mark the job as failed
    throw new Error('Failed to send email');
  }
};

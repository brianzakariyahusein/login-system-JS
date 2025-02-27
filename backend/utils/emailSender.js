const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Gunakan email pengirim
        pass: process.env.EMAIL_PASS, // Gunakan password atau app password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email terkirim!");
  } catch (error) {
    console.error("Gagal mengirim email:", error);
  }
};

module.exports = sendEmail;

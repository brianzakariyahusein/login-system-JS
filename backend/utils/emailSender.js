const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  try {
    console.log(`📨 Mengirim email ke: ${to}`); // Debugging
    console.log(`📢 Subject: ${subject}`);
    console.log(`💬 Message: ${text}`);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email berhasil dikirim!");
  } catch (error) {
    console.error("❌ Gagal mengirim email:", error.message);
  }
};

module.exports = sendEmail;

const nodemailer = require("nodemailer");

module.exports.sendmail = async (email, otp, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_MAIL,
        pass: process.env.PASSWORD, // App password, not Gmail password
      },
    });

    const mailOptions = {
      from: process.env.USER_MAIL,
      to: email,
      subject: message || "OTP for foodie application",
      text: otp,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Optional: rethrow if you want the caller to handle it
  }
};

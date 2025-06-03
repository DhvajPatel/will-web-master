import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/send-code', async (req, res) => {
  const { email } = req.body;

  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for port 465
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      ciphers: 'SSLv3',
    },
    family: 4  // ← Force IPv4 instead of IPv6
  });


  const mailOptions = {
    from: `"Param Ichha" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your verification code",
    text: `Your verification code is ${verificationCode}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Verification code sent!" });
  } catch (error) {
    console.error("❌ Email sending error:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

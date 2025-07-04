import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import nodemailer from 'nodemailer';
dotenv.config();
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World with Express.js and ES Modules!');
});

app.post("/send-mail", async (req, res) => {
  const { name, email, subject, message } = req.body;
   console.log(name, email, subject, message );
   console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS, process.env.TO_EMAIL);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: 'smtp.gmail.com' ,
    port: 465 ,
    secure: true ,
    auth: {
      user: process.env.EMAIL_USER,        // your Gmail
      pass: process.env.EMAIL_PASS         // App password from Gmail
    }
  });

  if(transporter){
    console.log("transporter is working");
  }

  // ✅ 1. Mail to site owner (you)
  const adminMail = {
    from: process.env.EMAIL_USER, // ✅ Use your own email here
    to: process.env.TO_EMAIL,
    subject: `Contact Form: ${subject}`,
    text: `You received a message from your website:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  };

  // ✅ 2. Auto-reply to user
  const autoReply = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "I received your message",
    text: `Hi ${name},\n\nThank you for contacting me!\ni received your message and will get back to you soon.\n\nYour message:\n"${message}"\n\n— Best regards,\nTamanna Akter`
  };


  try {
    await transporter.sendMail(adminMail);
    await transporter.sendMail(autoReply);
    console.log("Mail sent successfully");
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Mail sending failed:", error.message);
    console.error("Error details:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});
export default app
// app.listen(port, () => {
//   console.log(`Server listening at http://localhost:${port}`);
// });

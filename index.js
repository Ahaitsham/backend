import express from "express"
import nodemailer from "nodemailer"
import bodyParser from "body-parser"
import dotenv from "dotenv"
dotenv.config()

const app = express();
// const PORT= 3000;
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.render("index.ejs")
})

app.post("/message", async (req, res) => {
  try {
    const { name, message } = req.body;

    if (!name || !message) {
      return res.status(400).send("Missing fields");
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `Form submitted by ${name}`,
      text: `Name: ${name}\nMessage: ${message}`,
    });

    return res.render("success.ejs");
  } catch (error) {
    console.error("Mail Error:", error);
    return res.status(500).send("Email failed");
  }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});



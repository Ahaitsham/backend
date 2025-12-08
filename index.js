import express from "express"
import nodemailer from "nodemailer"
import bodyParser from "body-parser"
import dotenv from "dotenv"
dotenv.config()

const app = express();
// const PORT= 3000;
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.render("index.ejs")
})

app.post("/message",async(req,res)=>{
    const message = await req.body.message;
    const name = req.body.name

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,

       
      },
    });

    await transporter.sendMail({
      from: "demo@gmail.com",
      to: "ahtshamsaifi345@gmail.com",
      subject: `Form submitted by user ${name}`,
      text: `Name: ${name}\n Message: ${message}`,
    });
    res.render("success.ejs", {
    });
    console.log(`Name- ${name}\n message-${message}`)
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});



import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const resend = new Resend(process.env.RESEND_API_KEY);

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/message", async (req, res) => {
  const { name, message } = req.body;

  try {
    await resend.emails.send({
      from: "Website <onboarding@resend.dev>",
      to: ["yourgmail@gmail.com"], // ✅ YOUR EMAIL
      subject: `Form submitted by ${name}`,
      text: `Name: ${name}\n\nMessage:\n${message}`,
    });

    console.log("Mail sent successfully");
    res.render("success.ejs");

  } catch (error) {
    console.error("Mail Error:", error);
    res.status(500).send("Email failed");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

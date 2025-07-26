import express from "express";
import cors from "cors";
import { checkValue } from "./utils.js";
import path from "path";
import { sentmail } from "./mailservice.js";
const __dirname = path.resolve();
const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  console.log(req.originalUrl);
  next();
});

app.post("/form", async (req, res) => {
  try {
    const { fullname, phone, email, date, time, place, message } = req.body;

    if (checkValue(fullname)) {
      return res.json({ success: false, message: "Full name is required" });
    }
    if (checkValue(phone)) {
      return res.json({ success: false, message: "Phone number is required" });
    }
    if (checkValue(email)) {
      return res.json({ success: false, message: "Email is required" });
    }
    if (checkValue(date) || checkValue(time)) {
      return res.json({
        success: false,
        message: "Date and time are required",
      });
    }
    if (checkValue(place)) {
      return res.json({ success: false, message: "Place is required" });
    }

    // Send confirmation email
    const options = {
      to: email,

      fullname,
      phone,
      email,
      date,
      time,
      place,
      message,
    };
    await sentmail(options);

    return res.json({ success: true, message: "Form submitted successfully" });
  } catch (err) {
    console.error("Error in /form:", err);
    return res.json({ success: false, message: "Internal Server Error" });
  }
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("server is running..");
});

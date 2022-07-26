const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model");
const bcrypt = require("bcrypt");

app.use(cors());
app.use(express.json());

app.listen(3001, () => {
  console.log("Ruuning!");
});

const URL =
  "mongodb+srv://joab_giraldo:tom_holland_2001@cluster0.avxfajc.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(URL)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.post("/api/register", async (req, res) => {
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: "Duplicate email" });
  }
});

app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (user) {
    return res.json({ status: "success", user: true });
  } else {
    return res.json({ status: "error", user: false });
  }
});

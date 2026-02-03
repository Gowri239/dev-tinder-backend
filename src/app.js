const express = require("express");
const connectDB = require("./Config/database");
const User = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Krishna",
    lastName: "Koneti",
    gender: "male",
    age: 30,
    emailId: "kk@gmail.com",
    password: "abcde",
  });

  await user.save();
  res.send("User Added Successfully");
});

connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(3000, () => {
      console.log("Server successfully running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database connection error", err);
  });

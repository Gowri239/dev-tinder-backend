const express = require("express");
const connectDB = require("./Config/database");
const User = require("./models/user");
const validationSchema = require("./utils");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();
// it will take req.body json and convert it to js object
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    validationSchema(req.body);
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;

    const user = new User(req.body);
    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    console.log("Error while signup", err);
    res.status(400).send("Something went wrong" + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) res.status(404).send("Invalid Credentials");

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) res.status(404).send("Invalid Credentials");

    //create a jwt token
    const token = jwt.sign({ _id: user._id }, "Gowri@2329");
    // set token in cookie
    res.cookie("token", token);
    res.send("Login successfull");
  } catch (err) {
    console.log("Error while login", err);
    res.status(400).send("Something went wrong" + err.message);
  }
});

app.get("/get", async (req, res) => {
  try {
    const resp = await User.find({ emailId: req.body.emailId });
    if (!resp) res.status(404).send("User Not found");
    res.send(resp);
  } catch (err) {
    console.log("Something went wrong", err);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const resp = await User.find({});
    res.send(resp);
  } catch (err) {
    console.log("something went wrong", err);
  }
});

app.post("/delete", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.body.userId);
    res.send("Deleted Successfully");
  } catch (err) {
    console.log("something went wrong", err);
  }
});

app.post("/update", async (req, res) => {
  try {
    const { userId, ...updateBody } = req.body;
    const resp = await User.findByIdAndUpdate(userId, updateBody, {
      new: true,
      runValidators: true,
    });
    res.send(resp);
  } catch (err) {
    console.log("something went wrong", err);
  }
});

app.post("/updateByEmail", async (req, res) => {
  try {
    const { emailId, ...updateBody } = req.body;
    const resp = await User.findOneAndUpdate(
      { emailId: emailId },
      { $set: updateBody },
      {
        new: true,
        runValidators: true,
      }
    );
    res.send(resp);
  } catch (err) {
    console.log("something went wrong", err);
  }
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

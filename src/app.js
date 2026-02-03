const express = require("express");
const connectDB = require("./Config/database");

const app = express();

app.use("/test", (req, res) => {
  res.end("Server successfully running on port 3000");
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

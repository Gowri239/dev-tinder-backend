const express = require("express");

const app = express();

app.use("/test", (req, res) => {
  res.end("Server successfully running on port 3000");
});

app.listen(3000);

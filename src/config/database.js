const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://Gowri:KKkg%402329@namastenode.125zreo.mongodb.net/%20now%20,%20where%20can%20I%20find%20my%20dbusername%20and%20password/devTinder"
  );
};

module.exports = connectDB;

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const logger = require("morgan");
const cors = require("cors");

const mainRoute = require("./routes/index");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3500;

//! middlewares
app.use(express.json());
app.use(logger("dev"));
app.use(cors());

app.use("/api", mainRoute);

//! MongoDB Connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.log(error);
  }
};

//! listenin on port
app.listen(PORT, () => {
  connect();
  console.log(`Sunucu ${PORT} portunda çalışıyor...`);
});

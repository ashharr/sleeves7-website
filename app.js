require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();

mongoose.connect(process.env.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
.then(() => {
    console.log("ATLAS DATABASE CONNECTED SUCCESSFULLY");
})

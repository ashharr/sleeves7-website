require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const cors = require('cors');

//Routes
// const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");


mongoose.connect(process.env.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
.then(() => {
    console.log("MONGODB ATLAS CONNECTED SUCCESSFULLY");
})


//MIDDLEWARE
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
// app.use(express.json())
app.use(cors());

//My routes
app.use("/api", authRoutes);
// app.use("/api", userRoutes);

const port = process.env.PORT || 8000;

//SERVER
app.listen(port, () => {
  console.log(`App is running at ${port}.`);
})
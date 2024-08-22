const express = require('express');
const bodyParser = require('body-parser');
require("dotenv").config();
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
const cookieParser=require("cookie-parser");
const cors= require("cors");
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(cookieParser());
// CORS options
const corsOptions = {
  origin: 'http://localhost:5173', // Allow requests from this origin
  credentials: true, // Enable to accept credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));
// MongoDB connection
async function connecttodb() {
    const url = process.env.MONGO_DB;
    console.log(url);
    try {
      await mongoose.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      });
      console.log("connected");
    } catch (error) {
      console.log("not connected");
    }
  }
  connecttodb();
app.use(bodyParser.json());
// Routes
const authRouter = require('./routes/authentication');
app.use('/api', authRouter);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
const express = require("express");
var bodyParser = require('body-parser');
const mongoose = require("mongoose");
const Router = require('./routes');

const app = express();

const cors = require('cors');
app.options('*', cors());  // enable pre-flight
app.use(bodyParser.json());

const username = "shopify";
const password = "shopify123";
const dbname = "backend";

mongoose.connect(
  `mongodb+srv://${username}:${password}@shopifycluster.1ku6j.mongodb.net/${dbname}?retryWrites=true&w=majority`,
  async(err)=>{
    if (err) {
      console.log("NO CONNECTION TO DB");
      throw err;
    }
    console.log(`conncted to db ${dbname}`);
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(Router);

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
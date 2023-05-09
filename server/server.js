const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors=require('cors');

const app = express();

app.use(express.json());
//data parsing
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(cors());
//route and port
const PORT = process.env.PORT || 8000;
const routes = require("./Routes/api");

//mongoose connection setup
mongoose.connect("mongodb://localhost:27017/complainData", {
  useNewUrlParser: true,
});
mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!!!");
});

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is Running At ${PORT}`);
});

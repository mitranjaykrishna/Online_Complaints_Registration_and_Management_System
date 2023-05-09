const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ComplainScheema = new Schema({
  name: String,
  email: String,
  phone: String,
  description: String,
});

const ComplainModel = mongoose.model("complain", ComplainScheema);

module.exports = ComplainModel;

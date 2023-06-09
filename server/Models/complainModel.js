const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ComplainScheema = new Schema({
  name: String,
  email: String,
  phone: String,
  status:{type:String, default:'Pending'},
  description: String,
});

const ComplainModel = mongoose.model("complain", ComplainScheema);

module.exports = ComplainModel;

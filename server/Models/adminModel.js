const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const AdminScheema = new Schema({
    firstName: { type: String, required: true, unique: true },
    lastName: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const AdminModel = mongoose.model("admin", AdminScheema);

module.exports = AdminModel;

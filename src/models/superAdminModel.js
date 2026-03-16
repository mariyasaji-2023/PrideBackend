const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role:{
    type:String,
    required:true,
    enum: ["superAdmin", "admin"]
  },
  status:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  }
});

module.exports = mongoose.model("Admin", adminSchema);

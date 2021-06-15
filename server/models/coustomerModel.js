const mongoose = require("mongoose");

const coustomerSchema = new mongoose.Schema({
  user: { type: String, required: [true, "Unique Username is required"]},
  email: { type: String, required: [true, "Email is required"] },
  passwordHash: { type: String, required: [true, "PasswordHash is required"] },
  isAdmin:{type:Boolean,default:false},
  isAgent:{type:Boolean,default:false},
  loanStatus: {type:[{loanAmount:String,loanDuration:String,loanStatus:Number,Date:Number}],required:[false]}
});

const Coustomer = mongoose.model("coustomer", coustomerSchema);

module.exports = Coustomer;

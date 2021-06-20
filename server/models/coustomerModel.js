const mongoose = require("mongoose");

// const loanSchema = new mongoose.Schema({
//   loanCreatedOn: { type: Date },
//   Amount: { type: Number },
//   Duration: { type: Number }
// })

const coustomerSchema = new mongoose.Schema({
  user: { type: String, required: [true, "Unique Username is required"] },
  email: { type: String, required: [true, "Email is required"] },
  passwordHash: { type: String, required: [true, "PasswordHash is required"] },
  isAdmin: { type: Boolean, default: false },
  isAgent: { type: Boolean, default: false },
  loan: {type:Object }
});

// const Loan = mongoose.model("loan", loanSchema)
const Coustomer = mongoose.model("coustomer", coustomerSchema);

module.exports = Coustomer;
// module.exports = Loan;
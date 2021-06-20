const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    email: { type: String, required: [true, "Email is required"] },
    passwordHash: { type: String, required: [true, "PasswordHash is required"] },
    isAdmin: { type: Boolean, default: true }
});

const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;

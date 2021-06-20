const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
    email: { type: String, required: [true, "Email is required"] },
    passwordHash: { type: String, required: [true, "PasswordHash is required"] },
    isAgent: { type: Boolean, default: true }
});

const Agent = mongoose.model("agent", agentSchema);

module.exports = Agent;

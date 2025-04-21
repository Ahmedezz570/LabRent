const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    role : {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },  
});

module.exports = mongoose.model("Users", userSchema);

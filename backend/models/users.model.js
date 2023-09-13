const mongoose = require("mongoose");

// Creation of structure or schema for the 'users' collection
const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: "null",  
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: "true",
    },
    contact: {
      type: String,
      required: true,
      default: "null", 
    },
    file: {
      type: String,
      required: true,
      default: "null",  
    },
    role: {
      type: String,
      required: true,
      enum: ["student", "teacher"],
    },
  },
  { timestamps: true }
);

// Creating collection
module.exports = mongoose.model("users", usersSchema);

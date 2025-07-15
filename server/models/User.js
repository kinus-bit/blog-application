// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please provide a username'],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email address'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
    },
    fullName: {
      type: String,
      trim: true,
    },
    profilePicture: {
      type: String,
      default: 'default-avatar.png',
    },
    role: {
      type: String,
      enum: ['admin', 'author', 'reader'], // ✅ Only these roles allowed
      default: 'reader', // Default role when registering
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);

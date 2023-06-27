const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    name: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      unique: true,
      required: true,
    },
    pass: {
      type: "string",
      required: true,
    },
    isAdmin: {
      type: "boolean",
      default: false,
      required: true,
    },
    pic: {
      type: "string",
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('pass')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.pass = await bcrypt.hash(this.pass, salt);
});

userSchema.methods.matchPassword = async function (pass){
  return await bcrypt.compare(pass, this.pass)
};

const User = mongoose.model('User', userSchema);

module.exports = User;
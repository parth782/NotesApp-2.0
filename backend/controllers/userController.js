const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, pass, pic } = req.body;
    const userExist = await User.findOne({email});
    if (userExist) {
        res.status(400);
        throw new Error('User Already Exist');
    }
    let user = await User.create({ name: name, email: email, pass: pass, pic: pic });
    
  if (user) {
        res.json({
            _id:user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token:generateToken(user.id)
        })
    } else {
        res.status(400);
        throw new Error('Error Occured');
    }
});

const authUser = asyncHandler(async (req, res) => {
    const { email, pass } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(pass))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid Credentials");
    }
});

module.exports = {registerUser, authUser};
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function handleUserSignUP(req, res) {
  try {
    const { name, email, password } = req.body;

    //check if user exists

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "user already exist" });
    }

    //hash password

    const hashedPassword = await bcrypt.hash(password, 10);

    //create new user

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({ msg: "user registered successfully", data: newUser });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "error while signing up", error: error.massage });
  }
}

async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;

    //check if user exists

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }

    //compare password

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid creadentials" });
    }

    //generate token

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    console.log(process.env.JWT_SECRET);

    return res.status(200).json({ msg: "Login Successful", token, data: user });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "error while logging in user", error: error.msg });
  }
}

module.exports = { handleUserSignUP, handleUserLogin };

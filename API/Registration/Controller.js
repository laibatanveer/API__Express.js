const User = require("./Model");
const { connect } = require("mongoose");
const mongoose = require('mongoose');
require("dotenv").config();
const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");



// const Signup = async (req, res) => {
//   await connect(process.env.MONGO_URI);
//   const { username, email, password, role } = req.body;

//   // Check for missing fields
//   if (!username || !email || !password || !role) {
//     return res
//       .status(400)
//       .send({ message: "Please fill all required fields." });
//   }

//   try {
//     // Check if the user already exists using email
//     const existingUser = await User.findOne({ email: email.toLowerCase() });
//     if (existingUser) {
//       return res.status(400).send({ message: "email already exists." });
//     }

//     // Hash the password
//     const hashedPassword = await hash(password, 12);

//     // Create a new user
//     await User.create({
//       username,
//       email: email.toLowerCase(),
//       password: hashedPassword,
//       role,
//     });

//     res.status(201).send({ message: "User registered successfully." });
//   } catch (error) {
//     console.error("Error during signup:", error);
//     res
//       .status(500)
//       .send({ message: "Internal server error.", error: error.message });
//   }
// };
const Signup = async (req, res) => {
  const { username, password, email, role } = req.body;
  try {
      await mongoose.connect(process.env.MONGO_URI)
      console.log("DB Connected")
      const existingUser = await User.exists({ email: email })
      if (existingUser) {
          res.status(208).json({
              message: "User Already Exists"
          })
      }

      else {
          await User.create({ username, email,role, password: await hash(password, 12) })
          console.log("User Created")
          res.status(201).json({
              message: "Signup Successfully"
          })
      }
  }
  catch (error) {
      res.json({
          message: error.message
      })
  }
}


const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing Required Field" });
  }

  try {
    const CheckUser = await User.findOne({ email: email.toLowerCase() });

    if (!CheckUser) {
      return res.status(404).json({ message: "User Doesn't Exist" });
    }

    // Password comparison.
    const isValidPassword = await compare(password, CheckUser.password);

    // Log for debugging purposes.
    console.log("Password check:", isValidPassword);

    if (isValidPassword) {
      const UserData = {
        email: CheckUser.email,
        _id: CheckUser._id,
        role: CheckUser.role,
        ProfilePic: CheckUser.ProfilePic,
        Joining: CheckUser.Joining,
      };

      if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET is not set.");

        return res
          .status(500)
          .json({ message: "Server error: JWT_SECRET is missing." });
      }

      const token = sign(UserData, process.env.JWT_SECRET);

      return res.json({ message: "Successfully Logged in", token });
    } else {
      // This is where you're currently getting an error.
      console.log("User entered password:", password); // Temporarily for debugging.
      console.log("Stored hashed password:", CheckUser.password); // Temporarily for debugging.
      return res.status(403).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    await connect(process.env.MONGO_URI);
    const users = await User.find();

    res.json({ users });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  const { _id, email, username, ProfilePic } = req.body;

  const filter = { _id };
  const update = { email, username, ProfilePic };

  try {
    await connect(process.env.MONGO_URI);
    const updated = await User.findOneAndUpdate(filter, update, {
      new: true,
    });

    res.json({
      message: "successs",
      user: updated,
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

const userByID = async (req, res) => {
  const { _id } = req.query;

  try {
    await connect(process.env.MONGO_URI);
    const user = await User.findOne({ _id });

    res.json({ user });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const { _id } = req.body;

  try {
    await connect(process.env.MONGO_URI);
    await User.deleteOne({ _id });

    res.json({ message: "User Deleted Successfully" });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

module.exports = {
  Login,
  Signup,
  deleteUser,
  updateProfile,
  userByID,
  getAllUsers,
};

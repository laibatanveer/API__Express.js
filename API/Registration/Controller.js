require("dotenv").config();
// const { default: mongoose } = require('mongoose');
const user = require("./model");
const { connect } = require("mongoose");

const registerUser = async (req, res) => {
  // const firstName= req.body.fname;
  // const lastName= req.body.lname;
  // const userEmail= req.body.email;
  // const userPassword= req.body.psw;

  try {
    await connect(process.env.MONGO_URL);
    console.log("DB connected");

    await user.create({ fname, lname, email, psw });
    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = registerUser;

// require("dotenv").config();
// // const { default: mongoose } = require('mongoose');
// const user = require("./model");
// const { connect } = require("mongoose");

// const registerUser = async (req, res) => {
//   const { fname, lname, email, psw } = req.body;

//   try {
//     await connect(process.env.MONGO_URL);
//     console.log("DB connected");

//     await user.create({ fname, lname, email, psw });
//     res.json({
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
// module.exports = registerUser;

require("dotenv").config();
const bcrypt = require('bcrypt');
const user = require("./model");
const { connect } = require("mongoose");

// Connect to database once when your application starts.
connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch((error) => console.error("DB connection error:", error));

const registerUser = async (req, res) => {
  const { fname, lname, email, psw } = req.body;

  

  try {
    const hashedPsw = await bcrypt.hash(psw, 10);  // hash the password

    await user.create({ fname, lname, email, psw: hashedPsw });
    res.json({
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({   // Respond with an error status code and message.
      success: false,
      message: 'An error occurred during registration',
    });
  }
};

module.exports = registerUser;


const express = require("express");
const router = express.Router();
const registerUser = require("./Controller");

router.post("/register", registerUser);

module.exports = router;

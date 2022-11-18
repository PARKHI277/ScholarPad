const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const { sign, verify } = require("jsonwebtoken");
const auth_verify = require("../middleware/auth");

router.post("/signin", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send({ message: "This email is not registred" });

  // password is correct or not
  const validpass = await bcrypt.compare(req.body.password, user.password);

  if (!validpass) {
    return res.status(400).send({ message: "wrong password" });
  } else {
    const accessToken = jwt.sign(
      { user_create: user._id },
      process.env.TOKEN_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );
    console.log(accessToken);

    res.status(200).send({
      message: "Login Sucess",
      userName: user.userName,
      email: user.email,
      mobile: user.mobile,
      isVerified: user.isVerified,
      accessToken: accessToken,
    });
  }
});

module.exports = router;

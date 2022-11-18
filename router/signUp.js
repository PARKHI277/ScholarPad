require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const router = new express.Router();
const User = require("../models/user");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const atob = require("atob");
const emailer = require("../services/email");

const db = require("../config/dbconfig");

// user signup
router.post("/signup", async (req, res) => {
  try {
    const { userName, email, mobile, password } = await req.body;

    if (!userName && !email && !mobile && !password)
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(200).send({ message: "User already exists." });
    }
    const otp = Math.floor(Math.floor(100000 + Math.random() * 900000));

    const Password = req.body.password;

    const strongPasswords =
      /^(?=.*\d)(?=.*[!@#$%^&*-?])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (strongPasswords.test(Password)) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(Password, salt);

      const user_create = new User({
        userName,
        email,
        mobile,
        password: hashPassword,

        otpuser: otp,
      });

      const accessToken = jwt.sign(
        { user_create: user_create._id },
        process.env.TOKEN_SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );
      emailer(email, otp); //otp sent to the user
      user_create
        .save()
        .then(() => {
          setTimeout(() => {
            User.findByIdAndUpdate(
              user_create._id,
              { $set: { otpuser: null } },
              function (err, docs) {
                if (err) {
                  console.log(err);
                } else {
                  console.log("Updated User : ", docs);
                }
              }
            );
          }, 300000);

          res.status(201).send({
            _id: user_create._id,
            message: "Registration successfull and OTP sent",
            userName,
            email,
            mobile,
            accessToken: `${accessToken}`,
          });
        })
        .catch((err) => {
          let message;
          if (err.code === 11000) {
            // message = err.message;
            message = "Mobile number already exists";
            console.log(message);
          }
          if (err.name === "ValidationError") {
            if (
              err.message == "User validation failed: email: Email is required"
            )
              message = "Email is required";
            if (
              err.message ==
              "User validation failed: userName: username minimum length should be 3"
            )
              message = "Username is required";
            if (
              err.message ==
              "User validation failed: mobile: mobile number is required"
            )
              message = "Mobile number is required";
            //message=err.message;
          }
          if (err.name === "CastError") message = err.message;
          if (err.name === "EmptyError") message = err.message;
          return res.status(400).json({
            success: false,
            message: message,
          });
        });
    } else {
      res.status(400).send({
        success: false,
        message:
          "Password should have minimum 8 characters and include atleast one digit,one uppercase letter, one lowercase letter and one special character.",
      });
      //
    }
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send({ success: false, message: "Something went wrong" });
  }
});

//taking otp and updating isVerified in db

router.patch("/signup/verify", async (req, res) => {
  try {
    const accessToken = req.body.accessToken;
    const otp = req.body.otp;
    if (!accessToken && !otp)
      return res.status(400).json({
        success: false,
        message: "Send access token and OTP",
      });
    if (!accessToken)
      return res.status(400).json({
        success: false,
        message: "Send access token",
      });
    if (!otp)
      return res.status(400).json({
        success: false,
        message: "Send OTP",
      });
    const dec = accessToken.split(".")[1];
    //  console.log(dec);
    if (!dec) {
      return res.status(400).json({
        success: false,
        message: "Send access token in proper format.",
      });
    }
    const decode = JSON.parse(atob(dec));
    //console.log(decode);

    if (!decode) {
      return res.status(400).json({
        success: false,
        message: "Send access token in proper format.",
      });
    }

    const userExist = await User.findById(decode.user_create);
    //  console.log(userExist);
    if (!userExist)
      return res.status(400).json({
        success: false,
        message: "You are not registered.",
      });
    if (userExist.otpuser === otp) {
      await User.updateOne({ _id: decode.user_create }, { isVerified: true });
      res.status(200).json({
        success: true,
        message: "OTP correct. User is verified.",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err,
    });
  }
});

module.exports = router;

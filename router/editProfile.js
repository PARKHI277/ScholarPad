require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const router = new express.Router();
const User = require("../models/user");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const atob = require("atob");
const db = require("../config/dbconfig");
const verify = require("../middleware/auth");
router.patch("/edit", verify, async (req, res) => {
  try {
    if (req.body == undefined) {
      res.status(400).json({
        success: false,
        message: "Please fill at least one field to update",
      });
    }
    const token = req.body.accessToken;
    console.log(token);
    const dec = token.split(".")[1];
    const decode = JSON.parse(atob(dec));
    console.log(decode.user_create);
    User.findByIdAndUpdate(
      { _id: decode.user_create },
      {
        $set: req.body,
      },
      function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json({
            success: true,
            message: "User Details got updated ",
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "Enter fields to update ",
    });
  }
});
module.exports = router;

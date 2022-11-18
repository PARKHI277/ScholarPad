require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const router = new express.Router();
const User = require("../models/user");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const atob = require("atob");
const db = require("../config/dbconfig");

router.patch("/edit/:id", async (req, res) => {
  try {
    if (req.body == undefined)
      return res.status(400).json({
        success: false,
        message: "Please fill atleast one field.",
      });

    User.findByIdAndUpdate(
      req.params.id,
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

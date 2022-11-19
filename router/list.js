require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const router = new express.Router();
const User = require("../models/user");
const verify = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const db = require("../config/dbconfig");
const jwtDecode = require("jwt-decode");
const atob = require("atob");
const emailer = require("../services/email");
const national = require("../models/national");
const international = require("../models/international");
router.patch("/list/national/:id", verify, async (req, res) => {
  try {
    const token = req.body.accessToken;
    const dec = token.split(".")[1];
    const decode = JSON.parse(atob(dec));

    const details = await User.findOne({ _id: decode.user_create });
    const email = details.email;
    console.log(details.email);
    const nationalId = req.params.id;
    User.findOneAndUpdate(
      { _id: decode.user_create },
      {
        $push: { nationalId: nationalId },
      },
      function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log(docs);
          const scholarshipName = national.findOne({ nationalId });
          console.log(scholarshipName);
          const subject = "SCHOLARPAD";
          const text =
            "Your preffered scholarship has been added to your list. We will send regular updates about this scholarship on your mail";

          emailer(email, text, subject);
          res.status(200).json({
            success: true,
            message: "Scholarship added to preferred lists",
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: err,
    });
  }
});

router.patch("/list/international/:id", verify, async (req, res) => {
  try {
    const token = req.body.accessToken;
    const dec = token.split(".")[1];
    const decode = JSON.parse(atob(dec));
    console.log(decode.user_create);
    const details = await User.findOne({ _id: decode.user_create });
    const email = details.email;
    const internationalId = req.params.id;
    User.findOneAndUpdate(
      { _id: decode.user_create },
      {
        $push: { internationalId: internationalId },
      },
      function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log(docs);
          const subject = "SCHOLARPAD";
          const text =
            "Your preffered scholarship has been added to your list. We will send regular updates about this scholarship on your mail";

          emailer(email, text, subject);
          res.status(200).json({
            success: true,
            message: "Scholarship added to preferred lists",
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: err,
    });
  }
});

router.post("/mylist", async (req, res) => {
  try {
    const token = req.body.accessToken;
    const dec = token.split(".")[1];
    const decode = JSON.parse(atob(dec));
    console.log(decode.user_create);
    var details = [];
    const nationalDetails = await User.findById(decode.user_create).populate(
      "nationalId"
    );
    console.log(nationalDetails.nationalId);
    details.push(nationalDetails.nationalId);
    const internationalDetails = await User.findById(
      decode.user_create
    ).populate("internationalId");
    console.log(nationalDetails.nationalId);
    details.push(internationalDetails.internationalId);
    res.status(200).json(nationalDetails.nationalId);

    // const nationalDetails = await User.find({
    //   _id: decode.user_create,
    // });
    // details = details.push(nationalDetails.nationalId);
    // console.log(details);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
router.delete("/mylist/:id", async (req, res) => {
  try {
    const token = req.body.accessToken;
    const { nationalId } = req.params.id;
    const dec = token.split(".")[1];
    const decode = JSON.parse(atob(dec));
    User.updateOne(
      { _id: decode.user_create },
      {
        $pull: {
          nationalId: req.params.id,
        },
      },
      (err, docs) => {
        if (!err) {
          console.log(docs);
          res.status(200).json({
            success: true,
            message: "Scholarship Sucessfully Deleted",
          });
        } else console.log(err);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
module.exports = router;

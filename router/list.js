require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const router = new express.Router();
const User = require("../models/user");
const verify = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const db = require("../config/dbconfig");
const jwtDecode = require("jwt-decode");
const atob=require("atob");

router.patch("/list/national/:id",verify, async (req, res) => {
  try {const token = req.body.accessToken;
  const dec =token.split(".")[1];
  const decode = JSON.parse(atob(dec));
  console.log(decode.user_create);
  const nationalId=req.params.id;
   User.findOneAndUpdate(
      {_id:decode.user_create},
      {
        $push:{ nationalId:nationalId},
      },
      function (err, docs) {
        if (err) {
          console.log(err);
        } else {console.log(docs);
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

router.patch("/list/international/:id",verify, async (req, res) => {
    try {const token = req.body.accessToken;
    const dec =token.split(".")[1];
    const decode = JSON.parse(atob(dec));
    console.log(decode.user_create);
    const internationalId=req.params.id;
     User.findOneAndUpdate(
        {_id:decode.user_create},
        {
          $push:{ internationalId:internationalId},
        },
        function (err, docs) {
          if (err) {
            console.log(err);
          } else {console.log(docs);
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
module.exports = router;

require("dotenv").config();
const express = require("express");
const _ = require("lodash");
const router = new express.Router();
const User = require("../models/user");
const National = require("../models/national");
const International = require("../models/international");

// //search filter
router.get("/search", async (req, res) => {
  try {
    const query = req.query.data;
  
    const search1= await National.find({
    $text:{$search:query}
    });
    const search2= await International.find({
      $text:{$search:query}
      });
      const search=search1.concat(search2);
    res.status(200).json(search);
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err,
    });
  }
});
// router.get("/nationalfilter", async (req, res) => {
//   try {
//     const detail = req.query;
//     console.log(detail);
//     // const query=_.mapValues(req.query, _.method('toLowerCase'));
//     const nationalScholarship = await National.find({
//       $and: [
//         { type },
//         { address: { $regex: req.query.address, $options: "i" } },
//       ],
//     });
//     res.status(200).json(nationalScholarship);
//   } catch (err) {
//     res.status(400).send({
//       success: false,
//       message: err,
//     });
//   }
// });
router.get("/filter/national", async (req, res) => {
  try {
    const query = req.query;
    console.log(query);

    const national = await National.find(query).limit(6);
    console.log(national);
    res.status(200).json(national);
  } catch (err) {
    console.log(err);
    res.status(400).send({
      success: false,
      message: err,
    });
  }
});
router.get("/filter/international", async (req, res) => {
  try {
    const query = _.mapValues(req.query, _.method("toLowerCase"));
    const international = await International.find(req.query).limit(6);
    res.status(200).json(international);
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err,
    });
  }
});
module.exports = router;

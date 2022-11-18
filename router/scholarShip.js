const express = require("express");
const router = new express.Router();
const Scholar = require("../models/scholarShip");
const errorController = require("../controllers/errorController");

router.post("/scholar", async (req, res, next) => {
  try {
    const { name, description, lastDate, applyUrl } = await req.body;
    if (!name && !description && !lastDate && !applyUrl)
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });

    const scholarship_create = new Scholar({
      name,
      description,
      lastDate,
      applyUrl,
    });
    const saveScholar = await scholarship_create.save();
    res.status(201).send(saveScholar);
  } catch (err) {
    console.log(err);
    errorController(err, req, res, next);
  }
});

module.exports = router;

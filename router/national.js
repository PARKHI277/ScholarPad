const express = require("express");
const router = new express.Router();
const National = require("../models/national");
const errorController = require("../controllers/errorController");

router.post("/national", async (req, res, next) => {
  try {
    const { name, description, lastDate, applyUrl, income, graduate } =
      await req.body;
    if (!name && !description && !lastDate && !applyUrl && !income && !graduate)
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });

    const scholarship_create = new National({
      name,
      description,
      lastDate,
      applyUrl,
      income,
      graduate,
    });
    const saveScholar = await scholarship_create.save();
    res.status(201).send(saveScholar);
  } catch (err) {
    console.log(err);
    errorController(err, req, res, next);
  }
});

router.get("/national", async (req, res) => {
  try {
    const nationalData = await National.find().sort({ createdAt: -1 });

    res.status(200).send(nationalData);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;

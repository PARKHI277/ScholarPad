const express = require("express");
const router = new express.Router();
const interScholarShip = require("../models/international");
const errorController = require("../controllers/errorController");

router.post("/international", async (req, res, next) => {
  try {
    const { name, description, lastDate, applyUrl, country, graduate } =
      await req.body;
    if (
      !name &&
      !description &&
      !lastDate &&
      !applyUrl &&
      !country &&
      !graduate
    )
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });

    const scholarship_create = new interScholarShip({
      name,
      description,
      lastDate,
      applyUrl,
      country,
      graduate,
    });
    const saveScholar = await scholarship_create.save();
    res.status(201).send(saveScholar);
  } catch (err) {
    errorController(err, req, res, next);
  }
});
router.get("/international", async (req, res) => {
  try {
    const internationalData = await interScholarShip
      .find()
      .sort({ createdAt: -1 });

    res.status(200).send(internationalData);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
module.exports = router;

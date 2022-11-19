const express = require("express");
const router = new express.Router();
const State = require("../models/state");
const errorController = require("../controllers/errorController");

router.post("/state", async (req, res, next) => {
  try {
    const { state } = await req.body;
    const stateExist = await State.findOne({ state });

    if (stateExist) {
      return res.status(200).send({ message: "State already exists." });
    }

    const state_create = new State({
      state,
    });

    const saveState = await state_create.save();
    res.status(201).send(saveState);
  } catch (err) {
    errorController(err, req, res, next);
  }
});

// user side
router.get("/state", async (req, res) => {
  try {
    const allstates = await State.find().sort({ createdAt: -1 });
    // stateArray = allstates.map((allstate) => allstate.state);
    res.status(200).send(allstates);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;

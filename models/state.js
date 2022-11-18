require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stateschema = new Schema(
  {
    stateName: {
      type: String,
      required: [true, "State Name is required"],
    },
  },
  { timestamps: true }
);

const Statename = new mongoose.model("state", stateschema);
module.exports = Statename;

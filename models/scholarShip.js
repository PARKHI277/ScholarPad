require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scholarShipschema = new Schema(
  {
    name: {
      type: String,
      required: [true, "ScholarShip Name is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    lastDate: {
      type: Date,
      required: [true, "Last Date is required"],
    },
    applyUrl: {
      type: String,
      required: [true, "Apply Url is required"],
    },
  },
  { timestamps: true }
);

const scholarShip = new mongoose.model("scholarship", scholarShipschema);
module.exports = scholarShip;

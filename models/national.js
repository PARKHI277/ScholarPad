require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const nationalSchema = new Schema(
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
    income: {
      type: String,
      required: [true, "Income is required"],
    },
    graduate: {
      type: String,
      required: [true, "Graduate is required"],
    },
    category: {
      type: String,
    },
    state: {
      type: String,
    },
  },
  { timestamps: true }
);
nationalSchema.index({'$**':'text'});

const National = new mongoose.model("national", nationalSchema);
module.exports = National;

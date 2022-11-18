require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const collegeschema = new Schema(
  {
    collegeName: {
      type: String,
      required: [true, "College Name is required"],
    },
  },
  { timestamps: true }
);

const Collegename = new mongoose.model("college", collegeschema);
module.exports = Collegename;

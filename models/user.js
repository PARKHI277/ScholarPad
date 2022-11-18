require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {nationalId:[{type:Schema.Types.ObjectId,
  ref:"National"}],
  internationalId:[{type:Schema.Types.ObjectId,
    ref:"interScholarShip"}],
    userName: {
      type: String,
      required: [true, "User Name is required"],
      minlength: 2,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    mobile: {
      type: Number,
      required: [true, "Mobile Number is required"],
      maxLength: 10,
      minLength: 10,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    otpuser: {
      type: Number,
    },
    college: {
      type: String,
      default: null,
    },
    gender:{type:String},
    state: {
      type: String,
      default: null,
    },
    dob: {
      type: Date,
      trim: true,
    },
    category: {
      type: String,
      default: null,
    },
    income: {
      type: Number,
      deafult: 0,
    },
    userScholarship: {
      type: Array,
      default: null,
    },
  },
  { timestamps: true }
);

const User = new mongoose.model("User", UserSchema);
module.exports = User;

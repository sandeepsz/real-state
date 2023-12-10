import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },

  expireIn: Number,
});

const otp = mongoose.model("otp", otpSchema);

export default otp;

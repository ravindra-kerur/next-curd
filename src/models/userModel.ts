import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide the email"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Please provide the username"],
    unique: true,
  },
  password: { type: String, required: [true, "Please provide the password"] },
  isVerified: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  forgotPasswordToken: { type: String },
  forgotPasswordTokenExpiry: { type: Date },
  verifyToken: { type: String },
  verifyTokenExpiry: { type: Date },
});

// const Usertwo =
//   mongoose.models.usertwos || mongoose.model("usertwos", userSchema);
// // OR

const Usertwo =
  mongoose.models.usertwos || mongoose.model("usertwos", userSchema);
export default Usertwo;

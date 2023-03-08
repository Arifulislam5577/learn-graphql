import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    phone: { type: String, required: true },
  },
  { timestamps: true }
);

const User = model("user", userSchema);
export default User;

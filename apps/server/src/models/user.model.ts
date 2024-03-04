import { Schema as DbSchema } from "mongoose";

const mongoose = require("mongoose");

export const UserRoles = ["ADMIN", "USER", "GUEST"];
const UserSchema = new DbSchema({
  name: String,
  email: String,
  email_verified: Boolean,
  password: String,
  image: String,
  mobile: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    enum: UserRoles,
    default: "USER",
  },
  is_active: {
    type: Boolean,
    defaultValue: false,
  },
  created_at: {
    type: Date,
    defaultValue: new Date(),
  },
  address: {
    city: String,
    state: String,
    address: String,
    postal_code: String,
  },
});

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;

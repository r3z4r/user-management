import { Schema, model, models } from "mongoose";
import { randomUUID } from "crypto";

const UserSchema = new Schema({
  access_token: {
    type: "UUID",
    default: () => randomUUID(),
  },
  id: Schema.Types.ObjectId,
  createdAt: { type: Date, require: [true, "This field is required!"] },
  createdBy: { type: String, require: [true, "This field is required!"] },
  email: {
    type: String,
    uniq: [true, "Email already exists!"],
    require: [true, "This field is required!"],
  },
  isAdmin: Boolean,
  name: String,
  password: String,
  roles: { type: [String], require: [true, "This field is required!"] },
  updatedAt: { type: Date, require: [true, "This field is required!"] },
});

export const User = models.User || model("User", UserSchema);

export const generateUserModel = ({ user }) => ({
  getAll: async () => {
    if (!user || !user.roles.includes("ADMIN")) return null;
    return await User.find({});
  },
  getByEmail: async (email) => {
    return await User.findOne({
      email: email,
    });
  },
});

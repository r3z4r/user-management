import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  createdAt: { type: Date, require: [true, "This field is required!"] },
  createdBy: { type: String, require: [true, "This field is required!"] },
  email: {
    type: String,
    uniq: [true, "Email already exists!"],
    require: [true, "This field is required!"],
  },
  id: {
    type: Schema.Types.ObjectId,
    require: [true, "This field is required!"],
  },
  isAdmin: Boolean,
  name: String,
  password: String,
  roles: { type: [String], require: [true, "This field is required!"] },
  updatedAt: { type: Date, require: [true, "This field is required!"] },
});

const RoleSchema = new Schema({
  createdAt: { type: Date, require: [true, "This field is required!"] },
  description: { type: Number, require: [true, "This field is required!"] },
  id: { type: Schema.Types.UUID, require: [true, "This field is required!"] },
  title: {
    type: String,
    enum: {
      values: [
        "ADMIN",
        "CONTENT_EXPERT",
        "CONTENT_MANAGER",
        "COURIER",
        "CUSTOMER",
        "MAINTAINER",
        "SALES_EXPERT",
        "SALES_MANAGER",
      ],
      message: "enum validator failed for path `{PATH}` with value `{VALUE}`",
    },
  },
  updatedAt: { type: Date, require: [true, "This field is required!"] },
  //   user: [User!]!,
});

export const User = models.User || model("User", UserSchema);

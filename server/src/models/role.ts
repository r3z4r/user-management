import { Schema, model, models } from "mongoose";

enum UserRoles {
  admin = "ADMIN",
  contentExpert = "CONTENT_EXPERT",
  contentManager = "CONTENT_MANAGER",
  courier = "COURIER",
  customer = "CUSTOMER",
  maintainer = "MAINTAINER",
  saleseExpert = "SALES_EXPERT",
  salesManager = "SALES_MANAGER",
}

const RoleSchema = new Schema({
  createdAt: { type: Date, require: [true, "This field is required!"] },
  description: { type: Number, require: [true, "This field is required!"] },
  id: { type: Schema.Types.UUID, require: [true, "This field is required!"] },
  title: {
    type: String,
    enum: {
      values: Object.values(UserRoles),
      message: "enum validator failed for path `{PATH}` with value `{VALUE}`",
    },
  },
  updatedAt: { type: Date, require: [true, "This field is required!"] },
});

export const Role = models.Role || model("Role", RoleSchema);

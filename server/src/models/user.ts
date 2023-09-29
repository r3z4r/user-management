import { Schema, model, models } from "mongoose";
import { GraphQLError } from "graphql";
import { randomUUID } from "crypto";

const UserSchema = new Schema({
  access_token: {
    type: "UUID",
    default: () => randomUUID(),
  },
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
    if (!user || !user.roles.includes("ADMIN"))
      throw new GraphQLError("User is not authenticated", {
        extensions: {
          code: "UNAUTHENTICATED",
          http: { status: 401 },
        },
      });
    const total = await User.countDocuments({});
    const users = await User.find({});
    return {
      results: users,
      total,
    };
  },
  getByEmail: async (email) => {
    if (!user || !user.roles.includes("ADMIN"))
      throw new GraphQLError("User is not authenticated", {
        extensions: {
          code: "UNAUTHENTICATED",
          http: { status: 401 },
        },
      });
    return await User.findOne({
      email: email,
    });
  },
  login: async (email, password) => {
    const loginInfo = await User.findOne({ email: email });
    if (!loginInfo)
      throw new GraphQLError("User does not exist", {
        extensions: {
          code: "INVALID_CREDENTIALS",
          http: { status: 500 },
        },
      });
    if (loginInfo.password !== password) {
      throw new GraphQLError("Incorrect password", {
        extensions: {
          code: "INVALID_CREDENTIALS",
          http: { status: 200 },
        },
      });
    }
    return loginInfo;
  },
});

export const getUser = async (token: string) => {
  if (!token) return null;
  return await User.findOne({
    token: token,
  });
};

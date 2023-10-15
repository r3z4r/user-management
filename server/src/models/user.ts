import { Schema, model, models } from "mongoose";
import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";
import { UserRoles } from "./role";

const UserSchema = new Schema({
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
    const total = await User.countDocuments({});
    const users = await User.find({});
    return {
      results: users,
      total,
    };
  },
  getById: async (id) => {
    return await User.findOne({
      _id: id,
    });
  },
  login: async ({ email, password }) => {
    const loggedInUser = await User.findOne({ email: email });
    if (!loggedInUser)
      throw new GraphQLError("User does not exist", {
        extensions: {
          code: "INVALID_CREDENTIALS",
          http: { status: 500 },
        },
      });
    if (loggedInUser.password !== password) {
      throw new GraphQLError("Incorrect password", {
        extensions: {
          code: "INVALID_CREDENTIALS",
          http: { status: 200 },
        },
      });
    }
    const { _id, roles } = loggedInUser;
    const access_token = jwt.sign(
      { _id, roles },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: 60 * 60 }
    );
    return { access_token: access_token };
  },
  assignRole: async ({ role, userId }) => {
    checkUserRole(user, UserRoles.admin);
    const dbResponse = await User.updateOne(
      { _id: userId },
      { $addToSet: { roles: role } }
    );
    if (!dbResponse?.acknowledged) {
      throw new GraphQLError("Something went wrong", {
        extensions: {
          code: "NOT_FOUND",
          http: { status: 400 },
        },
      });
    }
    //TODO: make more performant
    const { roles } = await User.findOne({ _id: userId });
    return { id: userId, roles };
  },
  removeRole: async ({ role, userId }) => {
    checkUserRole(user, UserRoles.admin);
    const dbResponse = await User.updateOne(
      { _id: userId },
      { $pull: { roles: role } }
    );
    if (!dbResponse?.modifiedCount) {
      return false;
    }
    return true;
  },
});

const checkUserRole = (user, role) => {
  if (!user || !user.roles.includes(role))
    throw new GraphQLError("User is not unauthorized", {
      extensions: {
        code: "UNAUTHORIZED",
        http: { status: 401 },
      },
    });
};

import { connectToDB } from "../utils/db";
import { User } from "../models/user";

export const resolvers = {
  Query: {
    user: async (parent, args, context, info) => {
      await connectToDB();
      await User.findOne({
        email: args.email,
      });
    },
  },
};

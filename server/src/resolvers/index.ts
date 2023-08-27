export const resolvers = {
  Query: {
    user: async (parent, args, context, info) => {
      return await context.models.User.getByEmail(args.email);
    },
  },
};

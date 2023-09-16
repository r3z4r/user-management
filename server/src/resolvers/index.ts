export const resolvers = {
  Query: {
    user: async (_, { email }, context) => {
      return await context.models.User.getByEmail(email);
    },
    users: async (_, __, context) => {
      return await context.models.User.getAll();
    },
  },
  Mutation: {
    login: async (_, { authUserInput }, context) => {
      return await context.models.User.login(
        authUserInput.email,
        authUserInput.password
      );
    },
  },
};

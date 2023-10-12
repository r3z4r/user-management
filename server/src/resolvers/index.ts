export const resolvers = {
  Query: {
    user: async (_, { id }, context) => {
      return await context.models.User.getById(id);
    },
    users: async (_, __, context) => {
      return await context.models.User.getAll();
    },
  },
  Mutation: {
    login: async (_, { authUserInput }, context) => {
      return await context.models.User.login(authUserInput);
    },
    assignRole: async (_, { assignRoleInput }, context) => {
      return await context.models.User.assignRole(assignRoleInput);
    },
  },
};

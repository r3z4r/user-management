const connectToDB = require("../utils/db");
const User = require("../models/user");

module.exports = {
  Query: {
    users: async (id) => {
      await connectToDB();
      await User.findOne({
        id: id,
      });
    },
  },
};

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typedefs";
import { connectToDB, disconnectMongo } from "./utils/db";

import { generateUserModel, getUser } from "./models/user";
import { disconnect } from "mongoose";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const main = async () => {
  await connectToDB();
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      const token = req.headers.authorization || "";
      const user = await getUser(token);
      return {
        user,
        models: {
          User: generateUserModel({ user }),
        },
      };
    },
  });
  console.log(`🚀  Server ready at: ${url}`);
  process.on("SIGINT", disconnectMongo.bind(null, { exit: true }));
};

main();

/* inserting dummy users*/
// enum UserRoles {
//   admin = "ADMIN",
//   contentExpert = "CONTENT_EXPERT",
//   contentManager = "CONTENT_MANAGER",
//   courier = "COURIER",
//   customer = "CUSTOMER",
//   maintainer = "MAINTAINER",
//   saleseExpert = "SALES_EXPERT",
//   salesManager = "SALES_MANAGER",
// }
// import { User } from "./models/user";
// function generateDummyUsers(count) {
//   const users = [];
//   for (let i = 1; i <= count; i++) {
//     users.push({
//       createdAt: new Date(),
//       createdBy: "admin",
//       email: `user${i}@example.com`,
//       name: `User ${i}`,
//       password: `password${i}`,
//       roles: Object.values(UserRoles).splice(i % 8),
//       updatedAt: new Date(),
//     });
//   }
//   return users;
// }

// // Insert dummy users
// async function insertDummyUsers() {
//   await connectToDB();
//   const dummyUsers = generateDummyUsers(15);
//   try {
//     await User.insertMany(dummyUsers);
//     console.log("Dummy users inserted successfully.");
//   } catch (error) {
//     console.error("Error inserting dummy users:", error);
//   } finally {
//     // mongoose.disconnect();
//   }
// }

// // Call the function to insert dummy users
// insertDummyUsers();

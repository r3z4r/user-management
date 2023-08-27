import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLError } from "graphql";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typedefs";
import { connectToDB } from "./utils/db";

import { generateUserModel } from "./models/user";

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

      const user = {}; //getUser(token);
      if (!user)
        throw new GraphQLError("User is not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      return {
        user,
        models: {
          User: generateUserModel({ user }),
        },
      };
    },
  });
  console.log(`🚀  Server ready at: ${url}`);
};

main();

// import { User } from "./models/user";
// function generateDummyUsers(count) {
//   const users = [];
//   for (let i = 1; i <= count; i++) {
//     users.push({
//       // access_token: uuidv4(),
//       createdAt: new Date(),
//       createdBy: "admin",
//       email: `user${i}@example.com`,
//       isAdmin: i === 1 ? true : false,
//       name: `User ${i}`,
//       password: `password${i}`,
//       roles: ["user"],
//       updatedAt: new Date(),
//     });
//   }
//   return users;
// }

// // Insert dummy users
// async function insertDummyUsers() {
//   const dummyUsers = generateDummyUsers(10);
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

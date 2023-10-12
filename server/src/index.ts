import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typedefs";
import { connectToDB, disconnectMongo } from "./utils/db";

import { generateUserModel } from "./models/user";
import jwt from "jsonwebtoken";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const main = async () => {
  await connectToDB();
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      const authHeader = req.headers.authorization || "";
      const token = authHeader && authHeader.split(/\s/)[1];
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

const getUser = async (token: string) => {
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    console.log(error);
    // throw new GraphQLError(err.message, {
    //   extensions: {
    //     code: "UNAUTHENTICATED",
    //     http: { status: 401 },
    //   },
    // });
  }
};

/* inserting dummy users*/
// import { UserRoles } from "./models/user";
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

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";

import { resolvers } from "./resolvers";
import { typeDefs } from "./typedefs";
import { connectToDB, disconnectMongo } from "./utils/db";
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
      const authHeader = req.headers.authorization || "";
      const token = authHeader && authHeader.split(/\s/)[1];
      if (!token && (req as any)?.body?.operationName !== "Login")
        throw new GraphQLError("You are not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
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
    throw new GraphQLError("Token expired", {
      extensions: {
        code: "TOEKN_TIMEOUT",
        http: { status: 401 },
      },
    });
  }
};

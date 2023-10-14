import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { handleSignOut } from "./auth";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const resetToken = onError(({ networkError }) => {
  if (
    networkError &&
    networkError.name === "ServerError" &&
    (networkError as any)?.statusCode === 401
  ) {
    console.log(networkError);
    handleSignOut();
    window.location.replace(`${window.location.origin}/`);
  }
});

const apolloClient = new ApolloClient({
  link: from([authLink, resetToken, httpLink]),
  cache: new InMemoryCache(),
});

export default apolloClient;

import { gql } from "@apollo/client";
import apolloClient from "@/utils/apolloClient";

const LOGIN_MUTATION = gql`
  mutation login($authUserInput: AuthUserInput!) {
    login(authUserInput: $authUserInput) {
      access_token
      updatedAt
    }
  }
`;

export const handleLogin = async (email: string, password: string) => {
  try {
    const { data } = await apolloClient.mutate({
      mutation: LOGIN_MUTATION,
      variables: {
        authUserInput: {
          email,
          password,
        },
      },
    });
    const { login } = data;
    const { access_token: accessToken, updatedAt } = login;
    localStorage.setItem("ACCESS_TOKEN", accessToken);
    localStorage.setItem("UPDATED_AT", updatedAt);
    return accessToken;
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    reportError({ message });
  }
};

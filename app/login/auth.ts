import { gql } from "@apollo/client";
import apolloClient from "@/utils/apolloClient";

const LOGIN_MUTATION = gql`
  mutation login($authUserInput: AuthUserInput!) {
    login(authUserInput: $authUserInput) {
      access_token
      # Add other user fields you want to retrieve if needed
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
    const accessToken = login.access_token;
    localStorage.setItem("ACCESS_TOKEN", accessToken);
    return accessToken;
  } catch (error) {
    console.error("Error during login:", error.message);
  }
};

"use client";
import { User } from "@/types/User";
import { gql } from "@apollo/client";
import apolloClient from "@/utils/apolloClient";
import UsersCard from "@/components/UsersCard";
import { useEffect, useState } from "react";

const USER_QUERY = gql`
  query getUsers {
    users {
      results {
        id
        name
        email
        roles {
          id
          title
        }
      }
    }
  }
`;

const getUsers = async () => {
  try {
    const { data } = await apolloClient.query({
      query: USER_QUERY,
    });
    const { users } = data;
    const usersList = users.results;
    return usersList;
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    reportError({ message });
  }
};

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const users: User[] = await getUsers();
    setUsers(users);
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  if (!users) return null;
  return <UsersCard users={users} />;
};

export default Home;

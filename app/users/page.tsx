import UsersCard from "@/components/UsersCard";
import User from "@/types/User";

const users: User[] = [
  {
    name: "User 1",
    roles: [
      { name: "Admin", isActive: true },
      { name: "Editor", isActive: false },
    ],
  },
  {
    name: "User 2",
    roles: [
      { name: "Admin", isActive: false },
      { name: "Editor", isActive: true },
    ],
  },
  // Add more users here...
];

const Home: React.FC = () => {
  return <UsersCard users={users} />;
};

export default Home;

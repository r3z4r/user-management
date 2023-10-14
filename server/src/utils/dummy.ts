/* inserting dummy users*/
import { UserRoles } from "../models/role";
import { User } from "../models/user";
import { connectToDB } from "./db";
function generateDummyUsers(count) {
  const users = [];
  for (let i = 1; i <= count; i++) {
    users.push({
      createdAt: new Date(),
      createdBy: "admin",
      email: `user${i}@example.com`,
      name: `User ${i}`,
      password: `password${i}`,
      roles: Object.values(UserRoles).splice(i % 8),
      updatedAt: new Date(),
    });
  }
  return users;
}

// Insert dummy users
export async function insertDummyUsers() {
  await connectToDB();
  const dummyUsers = generateDummyUsers(15);
  try {
    await User.insertMany(dummyUsers);
    console.log("Dummy users inserted successfully.");
  } catch (error) {
    console.error("Error inserting dummy users:", error);
  } finally {
    // mongoose.disconnect();
  }
}

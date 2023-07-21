"use client";
import { useState } from "react";
import User from "@/types/User";
import Image from "next/image";

interface UserCardProps {
  users: User[];
}

const UserCard: React.FC<UserCardProps> = ({ users }) => {
  const [activeRoleIndex, setActiveRoleIndex] = useState<number | null>(null);

  const handleRoleToggle = (index: number) => {
    setActiveRoleIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="bg-white dark:bg-slate-800 shadow-md rounded-lg px-8 py-10">
      {users.map((user, index) => (
        <div
          key={index}
          className="mb-4  text-black dark:text-white rounded-lg p-2 border dark:border-none dark:bg-slate-600"
        >
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold">{user.name}</p>
            <button onClick={() => handleRoleToggle(index)}>
              {activeRoleIndex !== index ? (
                <Image
                  className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                  src="/downArrow.svg"
                  alt="Expand User"
                  width={16}
                  height={16}
                />
              ) : (
                <Image
                  className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                  src="/upArrow.svg"
                  alt="Collapse User"
                  width={16}
                  height={16}
                />
              )}
            </button>
          </div>
          {activeRoleIndex === index && (
            <div className="m-2">
              <p className="mb-2 text-sm">Roles:</p>
              {user.roles.map((role, roleIndex) => (
                <label key={roleIndex} className="block mb-1 cursor-pointer">
                  <input
                    type="checkbox"
                    className="form-checkbox mr-2"
                    checked={role.isActive}
                    onChange={() => {}}
                  />
                  {role.name}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserCard;

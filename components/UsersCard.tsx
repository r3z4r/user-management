"use client";
import { useState } from "react";
import { User, UserRoles } from "@/types/User";
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
    <div className="bg-white dark:bg-slate-800  text-black dark:text-white shadow-md rounded-lg px-8 py-10">
      {users.length ? (
        users.map((user, index) => (
          <div
            key={index}
            className="mb-4  rounded-lg p-2 border dark:border-none dark:bg-slate-600"
          >
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold">{user.name || user.email}</p>
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
              <>
                <p className="m-2 text-sm">Roles:</p>
                <div className="m-2 flex flex-wrap">
                  {Object.keys(UserRoles).map((role, roleIndex) => (
                    <label
                      key={roleIndex}
                      className="w-1/3 mb-1 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="form-checkbox mr-1"
                        checked={(user.roles || []).indexOf(role) > 0}
                        onChange={() => {}}
                      />
                      {role}
                    </label>
                  ))}
                </div>
              </>
            )}
          </div>
        ))
      ) : (
        <div className="w-full flex justify-center">
          <h2>No Users Found</h2>
        </div>
      )}
    </div>
  );
};

export default UserCard;

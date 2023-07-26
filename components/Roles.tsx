import { ChangeEvent, useEffect, useState } from "react";
import { UserRoles, User } from "@/types/User";
import apolloClient from "@/utils/apolloClient";
import { gql } from "@apollo/client";

interface UserRolesData {
  userRoles: {
    roles: UserRoles[];
  };
}

const USER_ROLES_QUERY = gql`
  query GetUserRoles($userId: String!) {
    userRoles(id: $userId) {
      roles
    }
  }
`;

const getUserRoles = async (userId: string, clearCache: boolean) => {
  try {
    if (clearCache) {
      apolloClient.cache.evict({ id: `UserRoles:${userId}` });
      apolloClient.cache.gc();
    }
    const { data } = await apolloClient.query({
      query: USER_ROLES_QUERY,
      variables: { userId },
    });
    const { userRoles } = data;
    const userRolesList = userRoles.roles;
    return userRolesList;
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    reportError({ message });
  }
};

const handleRoleUpdate = async (
  userId: string,
  rolesToAssign: UserRoles[],
  rolesToRemove: UserRoles[]
) => {
  //creating the gql programmatically base on the roles
  const variables: { [x: string]: string } = { userId };
  let gqlVariables = "";
  let gqlQuery = "";
  rolesToRemove.forEach((r, index) => {
    const varName = `rolesToRemove${index}`;
    gqlQuery =
      gqlQuery +
      `removeRole${index}: removeRole(removeRoleInput: { userId: $userId, role: $${varName} })
      `;
    gqlVariables =
      gqlVariables +
      `$${varName}: UserRoles! 
      `;
    variables[varName] = r;
  });
  rolesToAssign.forEach((r, index) => {
    const varName = `rolesToAssign${index}`;
    gqlQuery =
      gqlQuery +
      `assignRole${index}: assignRole(assignRoleInput: { userId: $userId, role: $${varName} }){roles}
          `;
    gqlVariables =
      gqlVariables +
      `$${varName}: UserRoles!
          `;
    variables[varName] = r;
  });
  const UPDATE_ROLES_BATCH_MUTATION = gql`
    mutation UpdateRoles(
      $userId: String!
      ${gqlVariables}
    ) {
      ${gqlQuery}
    }
  `;
  //mutating the roles
  try {
    const { data } = await apolloClient.mutate({
      mutation: UPDATE_ROLES_BATCH_MUTATION,
      variables: {
        userId,
        ...variables,
      },
      refetchQueries: [{ query: USER_ROLES_QUERY, variables: { userId } }],
      update: (cache) => {
        const userRolesData = cache.readQuery<UserRolesData>({
          query: USER_ROLES_QUERY,
          variables: { userId },
        });
        const roles = userRolesData?.userRoles.roles ?? [];
        cache.evict({ id: `User:${userId}` });
        rolesToAssign.forEach((role) => {
          cache.evict({ id: `Role:${role}` });
        });
        rolesToRemove.forEach((role) => {
          cache.evict({ id: `Role:${role}` });
        });
        cache.writeQuery<UserRolesData>({
          query: USER_ROLES_QUERY,
          variables: { userId },
          data: {
            userRoles: {
              ...userRolesData?.userRoles,
              roles: [...rolesToAssign, ...roles].filter(
                (role) => !rolesToRemove.includes(role)
              ),
            },
          },
        });
      },
    });
    const lastQueryRoles = `assignRole${rolesToAssign.length - 1}`;
    const { roles } = data?.[lastQueryRoles];
    return roles;
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    reportError({ message });
  }
};

const Roles = ({ id }: { id: string }) => {
  const [roles, setRoles] = useState<UserRoles[]>([]);
  const [updatedRoles, setUpdatedRoles] = useState<UserRoles[]>([]);
  //fetch the user roles
  const fetchUserRoles = async (clearCache = false) => {
    const userRoles = await getUserRoles(id, clearCache);
    setRoles(userRoles);
    setUpdatedRoles(userRoles);
  };
  useEffect(() => {
    fetchUserRoles();
  }, []);
  const handleRolesChange = (
    e: ChangeEvent<HTMLInputElement>,
    role: UserRoles
  ) => {
    if (e.target.checked) {
      setUpdatedRoles([...updatedRoles, (UserRoles as any)[role]]);
    } else {
      setUpdatedRoles(
        updatedRoles.filter((r) => r !== (UserRoles as any)[role])
      );
    }
  };
  const handleReset = () => {
    setUpdatedRoles(roles);
  };
  const handleSave = async () => {
    const rolesToAssign = updatedRoles.filter((r) => !roles.includes(r));
    const rolesToRemove = roles.filter((r) => !updatedRoles.includes(r));
    const newRoles = await handleRoleUpdate(id, rolesToAssign, rolesToRemove);
    if (Array.isArray(newRoles)) {
      setRoles(newRoles);
      setUpdatedRoles(newRoles);
    }
  };

  return (
    <>
      <p className="m-2 text-sm">Roles:</p>
      <div className="m-2 flex flex-wrap">
        {Object.keys(UserRoles).map((role, roleIndex) => (
          <label
            key={roleIndex}
            className="md:w-1/3 sm:w-1/2 w-full mb-1 cursor-pointer"
          >
            <input
              type="checkbox"
              className="form-checkbox mr-1"
              checked={(updatedRoles || []).includes((UserRoles as any)[role])}
              onChange={(e) => handleRolesChange(e, role as UserRoles)}
            />
            {role}
          </label>
        ))}
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white text-sm px-4 mx-2 rounded focus:outline-none focus:shadow-outline"
        onClick={handleSave}
      >
        Save
      </button>
      <button
        className="border border-blue-500 hover:shadow-xl dark:text-white  text-sm px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleReset}
      >
        Reset
      </button>
    </>
  );
};

export default Roles;

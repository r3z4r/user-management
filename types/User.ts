interface Role {
  name: string;
  isActive: boolean;
}

interface User {
  name: string;
  roles: Role[];
}

export default User;

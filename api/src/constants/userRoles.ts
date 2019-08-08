interface UserRole {
  [key: string]: {
    id: number;
    name: string;
  };
}

export default {
  SUPER_ADMIN: {
    id: 1,
    name: 'Super Admin'
  },
  ADMIN: {
    id: 2,
    name: 'Admin'
  },
  USER: {
    id: 3,
    name: 'User'
  }
} as UserRole;

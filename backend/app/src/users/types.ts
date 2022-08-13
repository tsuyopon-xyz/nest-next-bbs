export type UserWithPassword = {
  userId: number;
  username: string;
  password: string;
};

export type User = Omit<UserWithPassword, 'password'>;

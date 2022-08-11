import { Injectable } from '@nestjs/common';
import type { UserWithPassword } from './types';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<UserWithPassword | undefined> {
    return this.users.find((user) => user.username === username);
  }
}

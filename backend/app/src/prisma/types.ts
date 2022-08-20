import { User as _User } from '@prisma/client';

export type User = Pick<_User, 'id' | 'name' | 'email'>;

export type UpdateInput = Partial<
  Pick<
    _User,
    | 'id'
    | 'name'
    | 'email'
    | 'password'
    | 'hashedRefreshToken'
    | 'isEmailConfirmed'
  >
>;

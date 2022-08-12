import { User as _User } from '@prisma/client';

export type User = Pick<_User, 'id' | 'name' | 'email'>;

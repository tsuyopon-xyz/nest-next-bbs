import { randomBytes, scrypt as _script } from 'crypto';
import { promisify } from 'util';
import { BadRequestException, Injectable } from '@nestjs/common';
import { User as PrismaUser } from '@prisma/client';
import { User } from 'src/prisma/types';
import { PrismaService } from 'src/prisma/prisma.service';

const scrypt = promisify(_script);

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findOne(email: string, password: string): Promise<User> {
    const user = await this.prismaService.user.findFirst({
      where: {
        email,
        deletedAt: null,
      },
    });
    if (!user) {
      throw new BadRequestException('ユーザーは存在しません');
    }
    const [salt, hash] = user.password.split('.');
    const hashToCompare = await createHash(salt, password);

    if (hash !== hashToCompare) {
      throw new BadRequestException('パスワードが違います');
    }

    return { id: user.id, name: user.name, email: user.email };
  }

  async findByEmail(email: string): Promise<PrismaUser> {
    const user = await this.prismaService.user.findFirst({
      where: {
        email,
        deletedAt: null,
      },
    });
    if (!user) {
      throw new BadRequestException('ユーザーは存在しません');
    }

    return user;
  }

  async create(username: string, email: string, password: string) {
    // emailの重複チェック
    const userForCheck = await this.prismaService.user.findFirst({
      where: {
        email,
        deletedAt: null,
      },
    });
    if (userForCheck) {
      throw new BadRequestException('Emailは既に使われています');
    }

    // passwordハッシュ化に使うsalt値生成（8バイト : 16文字）
    const salt = randomBytes(8).toString('hex');

    // passwordハッシュ化（32バイト : 64文字）
    const hash = await createHash(salt, password);

    // テーブルにユーザー追加
    const combinedSaltAndHashedPassword = `${salt}.${hash}`;
    const newUser = await this.prismaService.user.create({
      data: {
        name: username,
        email,
        password: combinedSaltAndHashedPassword,
      },
    });

    return newUser;
  }

  async markEmailAsConfirmedByUserId(id: number) {
    return this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        isEmailConfirmed: true,
      },
    });
  }
}

const createHash = async (salt: string, password: string) => {
  const hash = (await scrypt(password, salt, 32)) as Buffer;

  return hash.toString('hex');
};

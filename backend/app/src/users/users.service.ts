import { randomBytes, scrypt as _script } from 'crypto';
import { promisify } from 'util';
import { BadRequestException, Injectable } from '@nestjs/common';
// import { User, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

const scrypt = promisify(_script);

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(username: string, email: string, password: string) {
    // emailの重複チェック
    const userForCheck = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if (userForCheck) {
      throw new BadRequestException('Emailは既に使われています');
    }

    // passwordハッシュ化に使うsalt値生成（8バイト : 16文字）
    const salt = randomBytes(8).toString('hex');

    // passwordハッシュ化（32バイト : 64文字）
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // テーブルにユーザー追加
    const combinedSaltAndHashedPassword = `${salt}.${hash.toString('hex')}`;
    const newUser = await this.prismaService.user.create({
      data: {
        name: username,
        email,
        password: combinedSaltAndHashedPassword,
      },
    });

    return newUser;
  }
}

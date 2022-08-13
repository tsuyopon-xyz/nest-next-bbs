import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { User as PrismaUser } from '@prisma/client';
import { User, UpdateInput } from 'src/prisma/types';
import { PrismaService } from 'src/prisma/prisma.service';

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
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new BadRequestException('パスワードが違います');
    }

    return { id: user.id, name: user.name, email: user.email };
  }

  async findByEmail(email: string): Promise<PrismaUser | null> {
    const user = await this.prismaService.user.findFirst({
      where: {
        email,
        deletedAt: null,
      },
    });
    if (!user) {
      return null;
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

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // テーブルにユーザー追加
    const newUser = await this.prismaService.user.create({
      data: {
        name: username,
        email,
        password: hashedPassword,
      },
    });

    return newUser;
  }

  async resetPassword(id: number, newPassword: string) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await this.update({
      id,
      password: hashedPassword,
    });
  }

  async update(updateInput: UpdateInput) {
    let id = updateInput.id;
    const email = updateInput.email;
    if (!id && !email) return;

    if (!id && email) {
      const user = await this.findByEmail(email);
      id = user.id;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _, ...rest } = updateInput;
    await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        ...rest,
      },
    });
  }
}

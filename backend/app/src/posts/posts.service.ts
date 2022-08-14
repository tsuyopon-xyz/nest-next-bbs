import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { User } from 'src/prisma/types';
import { UsersService } from 'src/users/users.service';
import { CreatePostDto } from './dto/create-post.dto';

const MAX_TAKE_FOR_FIND_ALL = 50;

@Injectable()
export class PostsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async create(user: User, createPostDto: CreatePostDto) {
    const prismaUser = await this.usersService.findByEmail(user.email);
    if (!prismaUser.isEmailConfirmed) {
      throw new UnauthorizedException(
        '本登録が完了したユーザーのみ投稿できます',
      );
    }

    const post = await this.prismaService.post.create({
      data: {
        content: createPostDto.content,
        authorId: user.id,
      },
      select: {
        id: true,
        content: true,
        authorId: true,
        createdAt: true,
      },
    });

    return post;
  }

  async findAll(cursorId: number, take = 20) {
    const posts = await this.prismaService.post.findMany({
      where: {
        deletedAt: null,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: [
        {
          id: 'desc',
        },
      ],

      // Cursor-based pagination
      // https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination
      cursor: cursorId ? { id: cursorId } : undefined,
      skip: cursorId ? 1 : undefined,
      take: take > MAX_TAKE_FOR_FIND_ALL ? MAX_TAKE_FOR_FIND_ALL : take,
    });

    const total = await this.prismaService.post.count({
      where: {
        deletedAt: null,
      },
    });

    return {
      data: posts,
      total,
    };
  }

  async remove(user: User, postId: number) {
    const post = await this.prismaService.post.findFirst({
      where: {
        id: postId,
        deletedAt: null,
      },
      select: {
        authorId: true,
      },
    });
    if (!post) {
      throw new NotFoundException('投稿は存在しません');
    }

    if (post.authorId !== user.id) {
      throw new UnauthorizedException('他の人の投稿は消せません');
    }

    await this.prismaService.post.update({
      where: {
        id: postId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}

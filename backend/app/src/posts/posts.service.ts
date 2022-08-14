import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { User } from 'src/prisma/types';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(user: User, createPostDto: CreatePostDto) {
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

  findAll() {
    return `This action returns all posts`;
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

import { Injectable } from '@nestjs/common';
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

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}

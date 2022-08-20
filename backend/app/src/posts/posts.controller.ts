import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JWTAuthGuard)
  @Post()
  create(@Request() req, @Body() createPostDto: CreatePostDto) {
    return this.postsService.create(req.user, createPostDto);
  }

  @UseGuards(JWTAuthGuard)
  @Get()
  findAll(
    @Request() req: ExpressRequest,
    @Query('page') page?: string,
    @Query('take') take?: string,
  ) {
    const _page = page ? parseInt(page) : undefined;
    const _take = take ? parseInt(take) : undefined;

    return this.postsService.findAll(_page, _take);
  }

  @UseGuards(JWTAuthGuard)
  @Delete(':id')
  remove(@Request() req, @Param('id', ParseIntPipe) id: number) {
    return this.postsService.remove(req.user, id);
  }
}

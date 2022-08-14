import { Length } from 'class-validator';
import { CONTENT } from './constants';

export class CreatePostDto {
  @Length(CONTENT.MIN, CONTENT.MAX)
  content: string;
}

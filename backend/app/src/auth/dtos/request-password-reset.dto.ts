import { IsEmail, MaxLength } from 'class-validator';
import { EMAIL } from './constants';

export class RequestPasswordResetDto {
  @MaxLength(EMAIL.MAX)
  @IsEmail()
  email: string;
}

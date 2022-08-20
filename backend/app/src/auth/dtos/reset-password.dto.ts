import { IsString, MaxLength, MinLength } from 'class-validator';
import { PASSWORD } from './constants';

export class ResetPasswordDto {
  @IsString()
  @MinLength(PASSWORD.MIN)
  @MaxLength(PASSWORD.MAX)
  password: string;
}

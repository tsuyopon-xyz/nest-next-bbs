import { IsEmail, Length, MaxLength, MinLength } from 'class-validator';
import { PASSWORD, EMAIL, NAME } from './constants';

export class SignUpDto {
  @Length(NAME.MIN, NAME.MAX)
  name: string;

  @MaxLength(EMAIL.MAX)
  @IsEmail()
  email: string;

  @MinLength(PASSWORD.MIN)
  @MaxLength(PASSWORD.MAX) // Because of bcrypt specification
  password: string;
}

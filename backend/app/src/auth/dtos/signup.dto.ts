import { IsEmail, Length, MinLength } from 'class-validator';

export class SignUpDto {
  @Length(1, 20)
  name: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}

import { IsEmail, Length, MaxLength, MinLength } from 'class-validator';

export class SignUpDto {
  @Length(1, 20)
  name: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  @MaxLength(72) // Because of bcrypt specification
  password: string;
}

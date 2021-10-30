import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Length(8)
  password: string;
}

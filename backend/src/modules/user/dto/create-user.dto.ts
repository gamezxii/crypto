import {
  IsString,
  IsNotEmpty,
  Length,
  MinLength,
  IsEmail,
} from "class-validator";

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @Length(1, 100)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Length(1, 255)
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  last_name: string;
}

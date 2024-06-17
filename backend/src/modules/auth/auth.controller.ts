import { Controller, Post, Body, HttpCode } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login-auth.dto";
import { CreateUserDto } from "../user/dto/create-user.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post("/signin")
  login(@Body() createAuthDto: LoginDto) {
    return this.authService.login(
      createAuthDto.username,
      createAuthDto.password
    );
  }

  @Post("/signup")
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }
}

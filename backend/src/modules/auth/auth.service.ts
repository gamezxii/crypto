import { HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { throwBadRequest, validateHash } from "../../commons/utils";
import { UserService } from "../user/user.service";
import { ErrorCode } from "../../enums/error-codes.enum";
import { CreateUserDto } from "../user/dto/create-user.dto";

@Injectable()
export class AuthService {
  private secert: string = "";
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private configService: ConfigService
  ) {
    this.secert = this.configService.get("JWT_SECERT");
  }

  async login(
    username: string,
    password: string
  ): Promise<{
    token: string;
    first_name: string;
    last_name: string;
  }> {
    try {
      const user = await this.userService.getUserByUsername(username);

      if (!user) {
        throwBadRequest(
          ErrorCode.UNAUTHORIZED,
          HttpStatus.BAD_REQUEST,
          "Invalid email or password."
        );
      }

      const verified_password = await validateHash(password, user.password);

      if (!verified_password) {
        throwBadRequest(
          ErrorCode.UNAUTHORIZED,
          HttpStatus.BAD_REQUEST,
          "Invalid email or password."
        );
      }

      const payload_jwt = {
        kid: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
      };
      const jwt = this.jwtService.sign(payload_jwt, {
        secret: this.secert,
        expiresIn: "1d",
      });
      return {
        token: jwt,
        first_name: user.first_name,
        last_name: user.last_name,
      };
    } catch (error) {
      throwBadRequest(
        ErrorCode.UNAUTHORIZED,
        HttpStatus.BAD_REQUEST,
        "Invalid email or password."
      );
    }
  }

  async signup(body: CreateUserDto) {
    return await this.userService.create(body);
  }
}

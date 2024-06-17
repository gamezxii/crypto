import { PassportStrategy } from "@nestjs/passport";
import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { Strategy } from "passport-http-bearer";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/modules/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  private logger: Logger = new Logger();
  constructor(
    private jwtService: JwtService
    // private userService: UserService
  ) {
    super({
      secretOrKey: process.env.JWT_SECERT,
      ignoreExpiration: false,
    });
  }

  async validate(token: any, done: any) {
    try {
      this.jwtService.verify(token, { secret: process.env.JWT_SECERT });
      const dataToken: any = this.jwtService.decode(token);
      const user = {
        kid: dataToken.kid,
        iat: dataToken.iat,
        exp: dataToken.exp,
      };

      done(null, user);
    } catch (error) {
      console.log(error);
      throw new error();
    }
  }
}

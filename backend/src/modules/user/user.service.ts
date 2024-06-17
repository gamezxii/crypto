import { HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserModel } from "../../models/User.model";
import { InjectModel } from "@nestjs/sequelize";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { throwBadRequest } from "../../commons/utils";
import { ErrorCode } from "../../enums/error-codes.enum";

@Injectable()
export class UserService {
  constructor(@InjectModel(UserModel) private userModel: typeof UserModel) {}

  async getUserByUsername(username: string): Promise<UserModel> {
    return await this.userModel.findOne({
      where: {
        username: username,
      },
    });
  }

  async getUserByUserId(user_id: string): Promise<UserModel> {
    return await this.userModel.findByPk(user_id);
  }

  async create(createUserDto: CreateUserDto) {
    const user = plainToClass(UserModel, createUserDto);
    await validate(user);

    try {
      await this.userModel.create(createUserDto);
      return {
        message: "Register success fully.",
      };
    } catch (error) {
      throwBadRequest(
        ErrorCode.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
        "Error something went wrong."
      );
    }
  }
}

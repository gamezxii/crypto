import { BadRequestException } from "@nestjs/common";
import { compare, hashSync } from "bcryptjs";
import { ErrorCode } from "../enums/error-codes.enum";

export function generateHash(password: string): string {
  return hashSync(password, 10);
}

export function validateHash(password: string, hash: string): Promise<boolean> {
  if (!password || !hash) {
    return Promise.resolve(false);
  }

  return compare(password, hash);
}

export function throwBadRequest(
  error_code: ErrorCode,
  status_code: number,
  message: string
) {
  throw new BadRequestException({
    error_code: error_code,
    status_code: status_code,
    data: {
      message: message,
    },
  });
}



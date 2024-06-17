// import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class UserGuard extends AuthGuard('jwt') {
//   constructor(private jwtService: JwtService) {
//     super();
//   }
//   handleRequest(err, user) {
//     if (err || !user) {
//       throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
//     }
//     return user;
//   }
// }

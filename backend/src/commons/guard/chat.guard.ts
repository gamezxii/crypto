// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Observable } from 'rxjs';

// @Injectable()
// export class WebSocketAuthGuard implements CanActivate {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const client = context.switchToWs().getClient();
//     // ตรวจสอบการตรวจสอบอนุญาตของผู้ใช้งานที่เชื่อมต่อผ่าน WebSocket
//     // โดยตรวจสอบ token หรือข้อมูลอื่น ๆ ที่คุณใช้ในการตรวจสอบการตรวจสอบอนุญาต
//     // และ return true หากผู้ใช้งานมีสิทธิ์เข้าถึงหรือ false ถ้าไม่มีสิทธิ์
//     return true; // สำหรับตัวอย่างเท่านี้
//   }
// }

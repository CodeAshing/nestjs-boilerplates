import { WsException } from '@nestjs/websockets';

export class ResponseObject {
  errorSocket(message: string, statusCode: number) {
    return new WsException({
      status: 'error',
      data: null,
      message: message,
      code: statusCode,
    });
  }

  success(data: any, message?: string) {
    return {
      status: 'success',
      data: data,
      message: message,
      code: 200,
    };
  }
}

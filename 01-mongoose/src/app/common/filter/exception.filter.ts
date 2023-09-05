import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    //log in the console

    // console.log({ exception });

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const errorResponse = {
      status: 'error',
      code: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message:
        status !== HttpStatus.INTERNAL_SERVER_ERROR
          ? exception!['response']!['message'] ||
            exception!['message'] ||
            exception!['message']!['error'] ||
            null
          : exception!['message'] ||
            exception!['response']!['message'] ||
            exception!['message']!['error'] ||
            'Internal server error',
    };

    // clear the cookie if the user is not authenticated
    if (status === 401) response.clearCookie('api-auth');

    response.status(status).json(errorResponse);
  }
}

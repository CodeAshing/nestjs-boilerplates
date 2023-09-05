import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  Logger,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger('HTTP');
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const { ip, method, originalUrl, body } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      const now = Date.now();

      this.logger.log(
        `method: ${method} originalUrl:${originalUrl} statusCode:${statusCode} contentLength:${contentLength} - userAgent:${userAgent} - ip:${ip} - QueryDuration:${
          Date.now() - now
        }ms - body:${JSON.stringify(body)}`,
      );
    });

    return next.handle().pipe(tap(() => {}));
  }
}

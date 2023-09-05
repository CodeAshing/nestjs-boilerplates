import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();
    //if data found then return the client email else return the payload
    if (data) {
      return request['user'][data];
    }
    return request['user'];
  },
);

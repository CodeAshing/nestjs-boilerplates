import { RoleEnum } from '../../common/enum/roles.enum';
import { AuthService } from 'src/app/auth/auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ConfigService } from 'src/config/config.service';
import { Strategy } from 'passport-jwt';
import { responseEnum } from '../enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: (request: any) => {
        let authHeader, token;

        if (request?.handshake?.headers?.authorization) {
          token = request?.handshake.headers?.authorization;
        } else {
          authHeader = request?.headers.authorization;
          token = authHeader && authHeader.split(' ')[1];
        }
        return token;
      },
      ignoreExpiration: false,
      maxAge: '7d',
      passReqToCallback: true,
      secretOrKey: configService.get().jwtSecret,
    });
  }

  async validate(request: any, payload: any) {
    if (!payload) throw new UnauthorizedException(responseEnum.NOT_AUTHORIZED);

    let authHeader, token;

    if (request?.handshake?.headers?.authorization) {
      token = request?.handshake.headers?.authorization;
    } else {
      authHeader = request.headers['authorization'];
      token = authHeader && authHeader.split(' ')[1];
    }

    switch (payload.user) {
      case RoleEnum.EMPLOYEE: {
        const data = await this.authService.validateEmployeeToken(
          token,
          payload,
        );

        if (!data) throw new UnauthorizedException(responseEnum.NOT_AUTHORIZED);

        return data;
      }
      case RoleEnum.CLIENT: {
        const data = await this.authService.validateClientToken(token, payload);
        if (!data) throw new UnauthorizedException(responseEnum.NOT_AUTHORIZED);
        return data;
      }
    }
  }
}

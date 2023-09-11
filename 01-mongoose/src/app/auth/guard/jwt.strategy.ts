import { RoleEnum } from '../../common/enum/roles.enum'
import { AuthService } from 'src/app/auth/auth.service'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ConfigService } from 'src/config/config.service'
import { Strategy } from 'passport-jwt'
import { responseEnum } from '../enum'
import { JWTPayload } from '../interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: (req: Request): string | null => {
        if (req.signedCookies)
          return req.signedCookies['api-auth'].accessToken ?? null
      },
      ignoreExpiration: false,
      maxAge: '7d',
      passReqToCallback: true,
      secretOrKey: configService.get().jwtSecret,
    })
  }

  async validate(req: Request, payload: JWTPayload) {
    if (!payload) throw new UnauthorizedException(responseEnum.NOT_AUTHORIZED)

    const token = req.signedCookies['api-auth'].accessToken
    const data = await this.authService.validateToken(token, payload)

    if (!data) throw new UnauthorizedException(responseEnum.NOT_AUTHORIZED)

    return data
  }
}

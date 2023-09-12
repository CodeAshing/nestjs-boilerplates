import { RoleEnum } from '../../common/enum/roles.enum'
import { AuthService } from 'src/app/auth/auth.service'
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { PassportStrategy } from '@nestjs/passport'
import { ConfigService } from 'src/config/config.service'
import { Strategy } from 'passport-jwt'
import { Request } from 'express'
import { responseEnum } from '../enum'
import { JWTPayload } from '../interface'

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'RefreshTokenStrategy',
) {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,

    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: (req: Request): string | null => {
        if (req.signedCookies)
          return req.signedCookies['api-auth'].refreshToken ?? null
      },
      ignoreExpiration: false,
      maxAge: '7d',
      passReqToCallback: true,
      secretOrKey: configService.get().refreshSecret,
    })
  }

  async validate(request: Request, payload: JWTPayload) {
    if (!payload) throw new UnauthorizedException(responseEnum.NOT_AUTHORIZED)

    const token = request.signedCookies['api-auth'].accessToken
    if (!token) throw new UnauthorizedException(responseEnum.NOT_AUTHORIZED)

    const addToCache = async (key: string, value: string) => {

      const cacheUserRecord = await this.cacheManager.get<string[]>(key) ?? []

      cacheUserRecord.push(value)

      await this.cacheManager.set(
        key,
        cacheUserRecord,
        this.configService.get().cacheExpiresDurationInMinutes * 60 * 60,
      )
    }

    const data = await this.authService.validateToken(token, payload)

    if (!data) throw new UnauthorizedException(responseEnum.NOT_AUTHORIZED)

    await addToCache(payload.email, token)
    return data
  }
}

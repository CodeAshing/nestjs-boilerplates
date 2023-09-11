import { RoleEnum } from '../common/enum'
import {
  ForbiddenException,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common'

import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import * as moment from 'moment-timezone'
moment.tz.setDefault('Asia/Karachi')

import { Response, Request } from 'express'
import { connectionEnum } from 'src/app/common/enum'

import { JwtService } from '@nestjs/jwt'
import { ConfigService } from 'src/config/config.service'
import { IUserToken } from './interface'

import { LoginDTO, RegisterDTO } from './dto'
import { Cache } from 'cache-manager'
import { User, UserDocument } from '../modules/user/schema'

import { Helper } from 'src/app/common/helper/utilities.helper'
import { responseEnum } from './enum'

const helper = new Helper()
@Injectable()
export class AuthService {
  private logger = new Logger('AuthService')

  constructor(
    private readonly helper: Helper,
    private config: ConfigService,
    private jwt: JwtService,

    @Inject(CACHE_MANAGER) private cacheManager: Cache,

    @InjectModel(User.name, connectionEnum.ERP)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async register(body: RegisterDTO, response: Response): Promise<any> {
    this.logger.log('Hits register() Method')

    const userData = await this.userModel.findOne({
      email: body.email,
    })

    //check if employee exists
    if (userData) throw new ForbiddenException(responseEnum.INVALID_CREDENTIAL)

    const hash = await this.helper.encryptPassword(body.password)

    //generate jwt token for the employee
    const accessTokenPayload = {
      user: body.role,
      email: body.email,
      type: 'access',
    }

    const accessToken = await this.signToken(
      accessTokenPayload,
      this.config.get().tokenExpiresDurationInMinutesForEmployee + 'm',
      this.config.get().jwtSecret,
    )

    //generate refresh token for the employee
    const refreshTokenPayload = {
      user: body.role,
      email: body.email,
      type: 'refresh',
    }

    const refreshToken = await this.signToken(
      refreshTokenPayload,
      this.config.get().refreshExpiresDurationInYears + 'Y',
      this.config.get().refreshSecret,
    )

    response.cookie(
      'api-auth',
      { accessToken, refreshToken },
      {
        secure: true,
        httpOnly: true,
        expires: new Date(
          Number(new Date()) +
            this.config.get().cookieSecretExpiresDurationInMinutes * 60 * 1000,
        ),
        signed: true,
      },
    )

    await this.userModel.create({
      ...body,
      password: hash,
    })

    return null
  }

  async login(response: Response, body: LoginDTO): Promise<any> {
    this.logger.log('Hits login() Method')
    const { email, password } = body

    const userData = await this.userModel.findOne({
      email,
    })

    //check if user exists
    if (!userData) throw new ForbiddenException(responseEnum.INVALID_CREDENTIAL)

    const isMatched = await this.helper.comparePassword(
      password,
      userData.password,
    )

    if (!isMatched)
      throw new ForbiddenException(responseEnum.INVALID_CREDENTIAL)

    //generate jwt token for the employee
    const accessTokenPayload = {
      user: userData.role,
      email: body.email,
      type: 'access',
    }

    const accessToken = await this.signToken(
      accessTokenPayload,
      this.config.get().tokenExpiresDurationInMinutesForEmployee + 'm',
      this.config.get().jwtSecret,
    )

    //generate refresh token for the employee
    const refreshTokenPayload = {
      user: userData.role,
      email: body.email,
      type: 'refresh',
    }

    const refreshToken = await this.signToken(
      refreshTokenPayload,
      this.config.get().refreshExpiresDurationInYears + 'Y',
      this.config.get().refreshSecret,
    )

    response.cookie(
      'api-auth',
      { accessToken, refreshToken },
      {
        secure: true,
        httpOnly: true,
        expires: new Date(
          Number(new Date()) +
            this.config.get().cookieSecretExpiresDurationInMinutes * 60 * 1000,
        ),
        signed: true,
      },
    )

    return null
  }

  async logout(
    email: string,
    request: Request,
    response: Response,
  ): Promise<any> {
    const authToken = request.signedCookies['api-auth'].accessToken

    // get data from cache
    const cacheUserRecord = await this.cacheManager.get<{ name: string }>(email)

    let cacheData: any
    if (cacheUserRecord) {
      cacheData = cacheUserRecord
      cacheData[String(email)].push(authToken)
    } else {
      cacheData = {
        [email]: [authToken],
      }
    }
    // set cache data
    await this.cacheManager.set(
      email,
      JSON.stringify(cacheData),
      this.config.get().cacheExpiresDurationInMinutes * 60,
    )

    // Clear cookie
    response.clearCookie('api-auth')

    this.logger.log(`User ${email} logged out successfully`)

    return null
  }

  async signToken(
    payload: IUserToken,
    expiresIn: string,
    secret: string,
  ): Promise<string> {
    const token = await this.jwt.signAsync(payload, {
      expiresIn: expiresIn,
      secret: secret,
      issuer: this.config.get().clientDomain,
    })

    return token
  }

  async tokenRefresh(empCode: string, response: Response): Promise<any> {
    this.logger.log('Hits tokenRefresh()')

    //generate jwt token for the employee
    const accessTokenPayload = {
      user: RoleEnum.ADMIN,
      email: empCode,
      type: 'access',
    }

    const accessToken = await this.signToken(
      accessTokenPayload,
      this.config.get().tokenExpiresDurationInMinutesForEmployee + 'm',
      this.config.get().jwtSecret,
    )

    //generate refresh token for the employee
    const refreshTokenPayload = {
      user: RoleEnum.USER,
      email: empCode,
      type: 'refresh',
    }

    const refreshToken = await this.signToken(
      refreshTokenPayload,
      this.config.get().refreshExpiresDurationInYears + 'Y',
      this.config.get().refreshSecret,
    )

    response.cookie(
      'api-auth',
      { accessToken, refreshToken },
      {
        secure: true,
        httpOnly: true,
        expires: new Date(
          Number(new Date()) +
            this.config.get().cookieSecretExpiresDurationInMinutes * 60 * 1000,
        ),
        signed: true,
      },
    )
  }

  async validateToken(token: string, payload: IUserToken): Promise<User> {
    this.logger.log('Hits validateEmployeeToken()')

    const user = await this.userModel.findOne({
      email: payload.email,
    })

    if (!user) throw new ForbiddenException(responseEnum.NOT_AUTHORIZED)

    const cacheUser = await this.cacheManager.get<{ name: string }>(
      payload.email,
    )

    if (cacheUser) {
      let parsedUserData = cacheUser
      parsedUserData = parsedUserData[payload.email]

      // if (parsedUserData?.includes(token))
      //   throw new UnauthorizedException(responseEnum.SESSION_EXPIRED);
    }

    return user
  }
}

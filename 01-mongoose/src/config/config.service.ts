import { Injectable } from '@nestjs/common'

import { DEFAULT_CONFIG } from './config.default'
import { ConfigData } from './config.interface'

/**
 * Provides a means to access the application configuration.
 */
@Injectable()
export class ConfigService {
  private config: ConfigData

  constructor(data: ConfigData = DEFAULT_CONFIG) {
    this.config = data
  }

  /**
   * Loads the config from environment variables.
   */
  public lofusingDotEnv() {
    this.config = this.parseConfigFromEnv(process.env)
  }

  private parseConfigFromEnv(env: NodeJS.ProcessEnv): ConfigData {
    return {
      env: env.NODE_ENV || DEFAULT_CONFIG.env,
      port: Number(env.PORT) || DEFAULT_CONFIG.port,
      logLevel: env.LOG_LEVEL || DEFAULT_CONFIG.logLevel,
      jwtSecret: env.JWT_SECRET || DEFAULT_CONFIG.jwtSecret,
      refreshSecret: env.REFRESH_SECRET || DEFAULT_CONFIG.refreshSecret,
      cookieSecret: env.COOKIE_SECRET || DEFAULT_CONFIG.cookieSecret,
      clientDomain: env.CLIENT_DOMAIN || DEFAULT_CONFIG.clientDomain,
      cookieSecretExpiresDurationInMinutes:
        Number(env.CACHE_EXPIRES_DURATION_IN_MINUTES) ||
        DEFAULT_CONFIG.cookieSecretExpiresDurationInMinutes,
      transactionSecret:
        env.TRANSACTION_SECRET || DEFAULT_CONFIG.transactionSecret,
      databaseURI: env.DATABASE_URI || DEFAULT_CONFIG.databaseURI,
      tokenExpiresDurationInMinutesForEmployee:
        Number(env.TOKEN_EXPIRES_DURATION_IN_MINUTES) ||
        DEFAULT_CONFIG.tokenExpiresDurationInMinutesForEmployee,
      tokenExpiresDurationInMinutesForClient:
        Number(env.TOKEN_EXPIRES_DURATION_IN_MINUTES) ||
        DEFAULT_CONFIG.tokenExpiresDurationInMinutesForClient,
      cacheExpiresDurationInMinutes:
        Number(env.CACHE_EXPIRES_DURATION_IN_MINUTES) ||
        DEFAULT_CONFIG.cacheExpiresDurationInMinutes,
      refreshExpiresDurationInYears:
        Number(env.REFRESH_EXPIRES_DURATION_IN_YEARS) ||
        DEFAULT_CONFIG.refreshExpiresDurationInYears,
      clientOtpDurationInMinutes:
        Number(env.CLIENT_OTP_VALIDITY_DURATION_IN_MINUTES) ||
        DEFAULT_CONFIG.clientOtpDurationInMinutes,
      clientTransactionDurationInHours:
        Number(env.CLIENT_TRANSACTION_VALIDITY_DURATION_IN_HOURS) ||
        DEFAULT_CONFIG.clientTransactionDurationInHours,
    }
  }
  public get(): Readonly<ConfigData> {
    return this.config
  }
}

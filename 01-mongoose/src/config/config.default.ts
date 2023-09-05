import { ConfigData } from './config.interface';

export const DEFAULT_CONFIG: ConfigData = {
  env: 'development',
  port: 8080,
  logLevel: 'info',
  jwtSecret: 'random string',
  refreshSecret: 'random string',
  cookieSecret: 'random string',
  transactionSecret: 'random string',
  cacheExpiresDurationInMinutes: 60,
  refreshExpiresDurationInYears: 1,
  clientOtpDurationInMinutes: 30,
  clientTransactionDurationInHours: 12,
  localDatabaseURI: '',
  tokenExpiresDurationInMinutesForEmployee: 60,
  tokenExpiresDurationInMinutesForClient: 60,
};

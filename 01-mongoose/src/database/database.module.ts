import { ConfigService } from 'src/config/config.service'
import { Module, DynamicModule } from '@nestjs/common'
import { ConfigModule } from 'src/config/config.module'
import { DbConfigError, DbError } from './db.error'
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose'
import { connectionEnum } from 'src/app/common/enum'

@Module({})
export class DatabaseModule {
  public static getNoSqlConnectionOptions(
    config: ConfigService,
    databaseName: string,
  ): MongooseModuleOptions {
    const databaseURI = config.get()[databaseName]

    if (!databaseURI) {
      throw new DbConfigError('Database config is missing')
    }
    return {
      uri: databaseURI,
    }
  }
  public static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) =>
            DatabaseModule.getNoSqlConnectionOptions(
              configService,
              'databaseURI',
            ),
          inject: [ConfigService],
          connectionName: connectionEnum.database,
        }),
      ],
      controllers: [],
      providers: [],
      exports: [],
    }
  }
}

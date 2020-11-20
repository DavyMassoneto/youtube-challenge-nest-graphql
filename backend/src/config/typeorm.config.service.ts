import { Injectable } from '@nestjs/common'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { join } from 'path'

const baseDir = join(__dirname, '..')

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      port: Number(process.env.TYPEORM_PORT),
      entities: [`${baseDir}${process.env.TYPEORM_ENTITIES}`],
      migrations: [`${baseDir}${process.env.TYPEORM_MIGRATIONS}`],
      migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'TRUE',
      logging: process.env.TYPEORM_LOGGING === 'TRUE',
      cli: {
        migrationsDir: 'src/db/migrations',
        entitiesDir: 'src/db/entities',
      },
      synchronize: true,
    }
  }
}

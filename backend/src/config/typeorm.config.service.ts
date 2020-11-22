import { Injectable } from '@nestjs/common'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { join } from 'path'

const baseDir = join(__dirname, '..')
const entities = join(baseDir, '**', '**', '*.entity.js`')
const migrations = join(baseDir, '..', 'migrations', '*.js')

@Injectable()
export default class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      port: Number(process.env.TYPEORM_PORT),
      entities: [entities],
      migrations: [migrations],
      migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'TRUE',
      logging: process.env.TYPEORM_LOGGING === 'TRUE',
      cli: {
        migrationsDir: migrations,
        entitiesDir: entities,
      },
      synchronize: false,
      autoLoadEntities: true,
    }
  }
}

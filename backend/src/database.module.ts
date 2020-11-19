import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import path from 'path'

const baseDir = path.join(__dirname)

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('TYPEORM_HOST'),
        username: configService.get('TYPEORM_USERNAME'),
        password: configService.get('TYPEORM_PASSWORD'),
        database: configService.get('TYPEORM_DATABASE'),
        port: configService.get('TYPEORM_PORT'),
        entities: [`${baseDir}${configService.get('TYPEORM_ENTITIES')}`],
        migrations: [`${baseDir}${configService.get('TYPEORM_MIGRATIONS')}`],
        migrationsRun: configService.get('TYPEORM_MIGRATIONS_RUN') === 'TRUE',
        logging: configService.get('TYPEORM_LOGGING') === 'TRUE',
        seeds: ['src/db/seeds/*.seed.ts'],
        cli: {
          migrationsDir: 'src/db/migrations',
          entitiesDir: 'src/db/entities',
        },
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}

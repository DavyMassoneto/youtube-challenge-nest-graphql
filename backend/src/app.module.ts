import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'

import { AppController } from 'src/app.controller'
import { AppService } from 'src/app.service'
import { TypeOrmConfigService } from 'src/config/typeorm.config.service'
import { UsersModule } from 'src/users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRootAsync({
      useFactory: () => ({
        context: ({ req }) => ({ req }),
        typeDefs: [],
        resolvers: [],
        typePaths: ['./**/*.graphql'],
        installSubscriptionHandlers: true,
        definitions: {
          path: join(process.cwd(), 'graphql.schema.ts'),
          outputAs: 'class',
        },
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

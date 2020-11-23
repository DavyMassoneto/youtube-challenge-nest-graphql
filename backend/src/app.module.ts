import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AppController } from 'src/app.controller'
import { AppService } from 'src/app.service'
import { AuthModule } from 'src/auth/auth.module'
import TypeOrmConfigService from 'src/config/typeorm.config.service'
import GlobalModule from 'src/global.module'
import { MessagesModule } from 'src/messages/messages.module'
import { UsersModule } from 'src/users/users.module'

@Module({
  imports: [
    GlobalModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
    }),
    UsersModule,
    MessagesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

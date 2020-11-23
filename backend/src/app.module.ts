import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { CommandBus, CqrsModule } from '@nestjs/cqrs'
import { GraphQLModule } from '@nestjs/graphql'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AppController } from 'src/app.controller'
import { AppService } from 'src/app.service'
import { AuthModule } from 'src/auth/auth.module'
import JwtConfigService from 'src/config/jwt.config.service'
import TypeOrmConfigService from 'src/config/typeorm.config.service'
import GlobalModule from 'src/global.module'
import graphqlFactory from 'src/graphql.factory'
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
    UsersModule,
    MessagesModule,
    AuthModule,
    GraphQLModule.forRootAsync({
      imports: [CqrsModule, JwtModule.registerAsync({ useClass: JwtConfigService })],
      useFactory: graphqlFactory,
      inject: [CommandBus, JwtService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

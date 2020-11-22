import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import AuthResolver from 'src/auth/auth.resolver'
import PerformLoginHandler from 'src/auth/commands/handlers/perform-login.handler'
import JwtConfigService from 'src/config/jwt.config.service'

export const CommandHandlers = [PerformLoginHandler]
export const QueryHandlers = []
export const EventHandlers = []

@Module({
  imports: [JwtModule.registerAsync({ useClass: JwtConfigService }), CqrsModule, PassportModule],
  providers: [AuthResolver, ...CommandHandlers, ...EventHandlers, ...QueryHandlers],
})
export class AuthModule {}

import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import AuthResolver from 'src/auth/auth.resolver'
import JwtValidateHandler from 'src/auth/commands/handlers/jwt-validate.handler'
import PerformLoginHandler from 'src/auth/commands/handlers/perform-login.handler'
import LocalAuthGuard from 'src/auth/guards/local-auth.guard'
import JwtStrategy from 'src/auth/strategies/jwt.strategy'
import LocalStrategy from 'src/auth/strategies/local.strategy'
import JwtConfigService from 'src/config/jwt.config.service'

export const CommandHandlers = [PerformLoginHandler, JwtValidateHandler]
export const QueryHandlers = []
export const EventHandlers = []

@Module({
  imports: [JwtModule.registerAsync({ useClass: JwtConfigService }), CqrsModule, PassportModule],
  providers: [
    AuthResolver,
    LocalStrategy,
    JwtStrategy,
    LocalAuthGuard,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class AuthModule {}

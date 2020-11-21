import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { PassportModule } from '@nestjs/passport'

import PerformLoginHandler from 'src/auth/commands/handlers/perform-login.handler'
import { LocalStrategy } from 'src/auth/local.strategy'

export const CommandHandlers = [PerformLoginHandler]
export const QueryHandlers = []
export const EventHandlers = []

@Module({
  imports: [CqrsModule, PassportModule],
  providers: [LocalStrategy, ...CommandHandlers, ...EventHandlers, ...QueryHandlers],
})
export class AuthModule {}

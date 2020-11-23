import { Injectable } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'

import PerformLoginCommand from 'src/auth/commands/impl/perform-login.command'
import AuthPayloadOutput from 'src/auth/dto/auth-payload.output'

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly commandBus: CommandBus) {
    super({ passwordField: 'email', usernameField: 'email' })
  }

  async validate(email: string): Promise<AuthPayloadOutput> {
    return this.commandBus.execute(new PerformLoginCommand(email))
  }
}

import { Injectable } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'

import PerformLoginCommand from 'src/auth/commands/impl/perform-login.command'
import Users from 'src/users/users.entity'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly commandBus: CommandBus) {
    super()
  }

  async validate(email: string): Promise<Users> {
    return await this.commandBus.execute(new PerformLoginCommand(email))
  }
}

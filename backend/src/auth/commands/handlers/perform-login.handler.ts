import { UnauthorizedException } from '@nestjs/common'
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs'
import { JwtService } from '@nestjs/jwt'

import PerformLoginCommand from 'src/auth/commands/impl/perform-login.command'
import AuthPayload from 'src/auth/models/auth-payload'
import Users from 'src/users/models/users.entity'
import EmailUserQuery from 'src/users/queries/impl/email-user.query'

@CommandHandler(PerformLoginCommand)
export default class PerformLoginHandler implements ICommandHandler<PerformLoginCommand> {
  constructor(private readonly queryBus: QueryBus, private readonly jwtService: JwtService) {}

  async execute(command: PerformLoginCommand): Promise<AuthPayload> {
    const user: Users = await this.queryBus.execute(new EmailUserQuery(command.email))
    if (!user) {
      throw new UnauthorizedException()
    }
    const payload = new AuthPayload()
    payload.access_token = this.jwtService.sign({ email: user.email, id: user.id })
    return payload
  }
}

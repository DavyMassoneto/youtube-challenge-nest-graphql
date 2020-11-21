import { UnauthorizedException } from '@nestjs/common'
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs'
import { JwtService } from '@nestjs/jwt'

import PerformLoginCommand from 'src/auth/commands/impl/perform-login.command'
import EmailUserQuery from 'src/users/queries/impl/email-user.query'
import Users from 'src/users/users.entity'

@CommandHandler(PerformLoginCommand)
export default class PerformLoginHandler implements ICommandHandler<PerformLoginCommand> {
  constructor(private readonly queryBus: QueryBus, private readonly jwtService: JwtService) {}

  async execute(command: PerformLoginCommand): Promise<string> {
    const user: Users = await this.queryBus.execute(new EmailUserQuery(command.email))
    if (!user) {
      throw new UnauthorizedException()
    }
    return this.jwtService.sign({ email: user.email, id: user.id })
  }
}

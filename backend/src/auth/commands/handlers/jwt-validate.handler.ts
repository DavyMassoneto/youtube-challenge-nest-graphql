import { UnauthorizedException } from '@nestjs/common'
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs'

import JwtValidateCommand from 'src/auth/commands/impl/jwt-validate.command'
import Users from 'src/users/models/users.entity'
import UserQuery from 'src/users/queries/impl/user.query'

@CommandHandler(JwtValidateCommand)
export default class JwtValidateHandler implements ICommandHandler<JwtValidateCommand> {
  constructor(private readonly queryBus: QueryBus) {}

  async execute(command: JwtValidateCommand): Promise<Users> {
    const user: Users = await this.queryBus.execute(new UserQuery(command.userId))
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}

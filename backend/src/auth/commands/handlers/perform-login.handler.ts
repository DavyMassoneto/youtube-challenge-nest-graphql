import { NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs'
import { JwtService } from '@nestjs/jwt'

import PerformLoginCommand from 'src/auth/commands/impl/perform-login.command'
import AuthPayloadOutput from 'src/auth/dto/auth-payload.output'
import Users from 'src/users/models/users.entity'
import EmailUserQuery from 'src/users/queries/impl/email-user.query'

@CommandHandler(PerformLoginCommand)
export default class PerformLoginHandler implements ICommandHandler<PerformLoginCommand> {
  constructor(private readonly queryBus: QueryBus, private readonly jwtService: JwtService) {}

  async execute(command: PerformLoginCommand): Promise<AuthPayloadOutput> {
    const email = command.email.toLowerCase().trim()
    const user: Users = await this.queryBus.execute(new EmailUserQuery(email))
    if (!user) {
      throw new NotFoundException(`User with email ${email} does not exist`)
    }
    const payload = new AuthPayloadOutput()
    payload.token = this.jwtService.sign({ userId: user.id })
    return payload
  }
}

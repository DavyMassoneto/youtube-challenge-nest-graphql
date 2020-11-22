import { CommandBus } from '@nestjs/cqrs'
import { Args, Mutation, Resolver } from '@nestjs/graphql'

import PerformLoginCommand from 'src/auth/commands/impl/perform-login.command'
import AuthPayload from 'src/auth/models/auth-payload'

@Resolver('Auth')
export default class AuthResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => AuthPayload)
  public async login(@Args('email') email: string): Promise<AuthPayload> {
    return this.commandBus.execute(new PerformLoginCommand(email))
  }
}

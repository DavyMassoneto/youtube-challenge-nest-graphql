import { CommandBus } from '@nestjs/cqrs'
import { Args, Mutation, Resolver } from '@nestjs/graphql'

import PerformLoginCommand from 'src/auth/commands/impl/perform-login.command'
import AuthPayload from 'src/auth/models/auth-payload'
import AuthInput from 'src/auth/models/auth.input'

@Resolver('Auth')
export default class AuthResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => AuthPayload)
  public async login(@Args('data') input: AuthInput): Promise<AuthPayload> {
    return this.commandBus.execute(new PerformLoginCommand(input.email))
  }
}

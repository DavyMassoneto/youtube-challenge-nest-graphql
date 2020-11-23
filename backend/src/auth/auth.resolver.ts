import { UseGuards } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Args, Mutation, Resolver } from '@nestjs/graphql'

import PerformLoginCommand from 'src/auth/commands/impl/perform-login.command'
import AuthPayload from 'src/auth/dto/auth-payload'
import LocalAuthGuard from 'src/auth/guards/local-auth.guard'

@Resolver('Auth')
export default class AuthResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(LocalAuthGuard)
  @Mutation(() => AuthPayload)
  public async login(@Args('email') email: string): Promise<AuthPayload> {
    return this.commandBus.execute(new PerformLoginCommand(email))
  }
}

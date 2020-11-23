import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import CreateUserCommand from 'src/users/commands/impl/create-user.command'
import UsersInput from 'src/users/dto/users.input'
import Users from 'src/users/models/users.entity'
import EmailUserQuery from 'src/users/queries/impl/email-user.query'
import UserQuery from 'src/users/queries/impl/user.query'
import UsersQuery from 'src/users/queries/impl/users.query'

@Resolver(() => Users)
export default class UsersResolver {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Query(() => [Users])
  public async users(): Promise<Users[]> {
    return await this.queryBus.execute(new UsersQuery())
  }

  @Query(() => Users, { nullable: true })
  public async user(@Args('id') id: string): Promise<Users> {
    return await this.queryBus.execute(new UserQuery(id))
  }

  @Query(() => Users, { nullable: true })
  public async emailUser(@Args('email') email: string): Promise<Users> {
    return await this.queryBus.execute(new EmailUserQuery(email))
  }

  @Mutation(() => Users)
  public async createUser(@Args('data') input: UsersInput): Promise<Users> {
    return await this.commandBus.execute(new CreateUserCommand(input.email))
  }
}

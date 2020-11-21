import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'

import CreateMessageCommand from 'src/messages/commands/impl/create-message.command'
import Messages from 'src/messages/messages.entity'
import MessagesInput from 'src/messages/messages.input'
import MessageQuery from 'src/messages/queries/impl/message.query'
import MessagesQuery from 'src/messages/queries/impl/messages.query'
import UserMessagesQuery from 'src/messages/queries/impl/user-messages.query'
import UserQuery from 'src/users/queries/impl/user.query'
import Users from 'src/users/users.entity'

@Resolver(() => Messages)
export default class MessagesResolver {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Query(() => [Messages])
  public async messages(): Promise<Messages[]> {
    return await this.queryBus.execute(new MessagesQuery())
  }

  @Query(() => [Messages])
  public async userMessages(@Args('userId') userId: string): Promise<Messages[]> {
    return await this.queryBus.execute(new UserMessagesQuery(userId))
  }

  @Query(() => Messages, { nullable: true })
  public async message(@Args('messageId') messageId: string): Promise<Messages> {
    return await this.queryBus.execute(new MessageQuery(messageId))
  }

  @Mutation(() => Messages)
  public async createMessage(@Args('data') input: MessagesInput): Promise<Messages> {
    return await this.commandBus.execute(new CreateMessageCommand(input.content, input.user))
  }

  @ResolveField('user', () => Users)
  public async user(@Parent() parent: Messages): Promise<Users> {
    return await this.queryBus.execute(new UserQuery(parent.userId))
  }
}

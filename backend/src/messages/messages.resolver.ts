import { UseGuards } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'

import CtxUser from 'src/auth/decorators/ctx-user.decorator'
import JwtAuthGuard from 'src/auth/guards/jwt-auth.guard'
import CreateMessageCommand from 'src/messages/commands/impl/create-message.command'
import DeleteMessageCommand from 'src/messages/commands/impl/delete-message.command'
import MessageDeleteInput from 'src/messages/dto/message-delete.input'
import MessageDeleteOutput from 'src/messages/dto/message-delete.output'
import MessagesInput from 'src/messages/dto/messages.input'
import Messages from 'src/messages/models/messages.entity'
import MessageQuery from 'src/messages/queries/impl/message.query'
import MessagesQuery from 'src/messages/queries/impl/messages.query'
import UserMessagesQuery from 'src/messages/queries/impl/user-messages.query'
import Users from 'src/users/models/users.entity'
import UserQuery from 'src/users/queries/impl/user.query'

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

  @UseGuards(JwtAuthGuard)
  @Mutation(() => MessageDeleteOutput)
  public async deleteMessage(
    @Args('data') input: MessageDeleteInput,
    @CtxUser() user: Users,
  ): Promise<MessageDeleteOutput> {
    return await this.commandBus.execute(new DeleteMessageCommand(input.messageId, user.id))
  }

  @ResolveField('user', () => Users)
  public async user(@Parent() parent: Messages): Promise<Users> {
    return await this.queryBus.execute(new UserQuery(parent.userId))
  }
}

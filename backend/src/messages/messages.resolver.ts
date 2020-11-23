import { Inject, UseGuards } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Args, Mutation, Parent, Query, ResolveField, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'

import CtxUser from 'src/auth/decorators/ctx-user.decorator'
import JwtAuthGuard from 'src/auth/guards/jwt-auth.guard'
import CreateMessageCommand from 'src/messages/commands/impl/create-message.command'
import DeleteMessageCommand from 'src/messages/commands/impl/delete-message.command'
import EditMessageCommand from 'src/messages/commands/impl/edit-message.command'
import MessageDeleteInput from 'src/messages/dto/message-delete.input'
import MessageDeleteOutput from 'src/messages/dto/message-delete.output'
import MessageEditInput from 'src/messages/dto/message-edit.input'
import MessagesInput from 'src/messages/dto/messages.input'
import Messages from 'src/messages/models/messages.entity'
import MessageQuery from 'src/messages/queries/impl/message.query'
import MessagesQuery from 'src/messages/queries/impl/messages.query'
import UserMessagesQuery from 'src/messages/queries/impl/user-messages.query'
import Users from 'src/users/models/users.entity'
import UserQuery from 'src/users/queries/impl/user.query'

@Resolver(() => Messages)
export default class MessagesResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) {}

  @Query(() => [Messages])
  public async messages(): Promise<Messages[]> {
    return this.queryBus.execute(new MessagesQuery())
  }

  @Query(() => [Messages])
  public async userMessages(@Args('userId') userId: string): Promise<Messages[]> {
    return this.queryBus.execute(new UserMessagesQuery(userId))
  }

  @Query(() => Messages, { nullable: true })
  public async message(@Args('messageId') messageId: string): Promise<Messages> {
    return this.queryBus.execute(new MessageQuery(messageId))
  }

  @Mutation(() => Messages)
  public async createMessage(@Args('data') input: MessagesInput): Promise<Messages> {
    return this.commandBus.execute(new CreateMessageCommand(input.content, input.user))
  }

  @Mutation(() => Messages)
  public async editMessage(
    @Args('messageId') messageId: string,
    @Args('data') input: MessageEditInput,
  ): Promise<Messages> {
    return this.commandBus.execute(new EditMessageCommand(messageId, input.content, input.userId))
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => MessageDeleteOutput)
  public async deleteMessage(
    @Args('data') input: MessageDeleteInput,
    @CtxUser() user: Users,
  ): Promise<MessageDeleteOutput> {
    return this.commandBus.execute(new DeleteMessageCommand(input.messageId, user.id))
  }

  @UseGuards(JwtAuthGuard)
  @Subscription(() => Messages)
  messageAdded(): AsyncIterator<Messages> {
    return this.pubSub.asyncIterator('messageAdded')
  }

  @UseGuards(JwtAuthGuard)
  @Subscription(() => Messages, {
    filter: (payload, variables) => {
      return variables.messageId === null || (variables.messageId && payload.messageEdited.id === variables.messageId)
    },
  })
  messageEdited(@Args('messageId', { nullable: true }) _: string): AsyncIterator<Messages> {
    return this.pubSub.asyncIterator('messageEdited')
  }

  @ResolveField('user', () => Users)
  public async user(@Parent() parent: Messages): Promise<Users> {
    return this.queryBus.execute(new UserQuery(parent.userId))
  }
}

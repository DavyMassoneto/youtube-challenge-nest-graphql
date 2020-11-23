import { Inject, UnauthorizedException } from '@nestjs/common'
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs'
import { PubSub } from 'graphql-subscriptions'
import { getCustomRepository } from 'typeorm'

import EditMessageCommand from 'src/messages/commands/impl/edit-message.command'
import Messages from 'src/messages/models/messages.entity'
import MessageQuery from 'src/messages/queries/impl/message.query'
import MessageRepository from 'src/messages/repositories/message.repository'

@CommandHandler(EditMessageCommand)
export default class EditMessageHandler implements ICommandHandler<EditMessageCommand> {
  constructor(private readonly queryBus: QueryBus, @Inject('PUB_SUB') private readonly pubSub: PubSub) {}

  async execute(command: EditMessageCommand): Promise<Messages> {
    const message: Messages = await this.queryBus.execute(new MessageQuery(command.messageId))

    if (message.userId !== command.userId) {
      throw new UnauthorizedException()
    }

    message.content = command.content

    const messageRepository = getCustomRepository(MessageRepository)
    const createdMessage = await messageRepository.save(message)

    await this.pubSub.publish('messageEdited', { messageEdited: createdMessage })

    return createdMessage
  }
}

import { NotFoundException, UnauthorizedException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { getCustomRepository } from 'typeorm'

import DeleteMessageCommand from 'src/messages/commands/impl/delete-message.command'
import MessageDeleteOutput from 'src/messages/dto/message-delete.output'
import MessageRepository from 'src/messages/repositories/message.repository'

@CommandHandler(DeleteMessageCommand)
export default class DeleteMessageHandler implements ICommandHandler<DeleteMessageCommand> {
  async execute(command: DeleteMessageCommand): Promise<MessageDeleteOutput> {
    const messageRepository = getCustomRepository(MessageRepository)

    const found = await messageRepository.findOne(command.messageId)

    if (!found) {
      throw new NotFoundException('Message not found')
    }

    const isFromUserLogged = found.userId === command.userId

    if (!isFromUserLogged) {
      throw new UnauthorizedException('You can only delete your messages')
    }

    const deleted = await messageRepository.deleteMessage(command.messageId)
    const messageDelete = new MessageDeleteOutput()
    messageDelete.status = deleted.affected >= 1
    return messageDelete
  }
}

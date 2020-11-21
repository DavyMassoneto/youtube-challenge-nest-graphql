import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { getCustomRepository } from 'typeorm'

import Messages from 'src/messages/messages.entity'
import MessageQuery from 'src/messages/queries/impl/message.query'
import MessagesRepository from 'src/messages/repositories/messages.repository'

@QueryHandler(MessageQuery)
export default class MessageHandler implements IQueryHandler<MessageQuery> {
  public async execute(query: MessageQuery): Promise<Messages> {
    const messageRepository = getCustomRepository(MessagesRepository)
    return messageRepository.findOne(query.messageId)
  }
}

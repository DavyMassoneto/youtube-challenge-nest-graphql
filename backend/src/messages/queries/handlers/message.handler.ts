import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { getCustomRepository } from 'typeorm'

import Messages from 'src/messages/models/messages.entity'
import MessageQuery from 'src/messages/queries/impl/message.query'
import MessageRepository from 'src/messages/repositories/message.repository'

@QueryHandler(MessageQuery)
export default class MessageHandler implements IQueryHandler<MessageQuery> {
  public async execute(query: MessageQuery): Promise<Messages> {
    const messageRepository = getCustomRepository(MessageRepository)
    return messageRepository.findOne(query.messageId)
  }
}

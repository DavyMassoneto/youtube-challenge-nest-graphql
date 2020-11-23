import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { getCustomRepository } from 'typeorm'

import Messages from 'src/messages/models/messages.entity'
import MessagesQuery from 'src/messages/queries/impl/messages.query'
import MessageRepository from 'src/messages/repositories/message.repository'

@QueryHandler(MessagesQuery)
export default class MessagesHandler implements IQueryHandler<MessagesQuery> {
  public async execute(): Promise<Messages[]> {
    const messageRepository = getCustomRepository(MessageRepository)
    return messageRepository.find()
  }
}

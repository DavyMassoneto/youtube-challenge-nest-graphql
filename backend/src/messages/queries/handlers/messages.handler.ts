import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { getCustomRepository } from 'typeorm'

import Messages from 'src/messages/messages.entity'
import MessagesQuery from 'src/messages/queries/impl/messages.query'
import MessagesRepository from 'src/messages/repositories/messages.repository'

@QueryHandler(MessagesQuery)
export default class MessagesHandler implements IQueryHandler<MessagesQuery> {
  public async execute(): Promise<Messages[]> {
    const messageRepository = getCustomRepository(MessagesRepository)
    return messageRepository.find()
  }
}

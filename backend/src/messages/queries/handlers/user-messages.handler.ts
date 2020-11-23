import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { getCustomRepository } from 'typeorm'

import Messages from 'src/messages/models/messages.entity'
import UserMessagesQuery from 'src/messages/queries/impl/user-messages.query'
import MessageRepository from 'src/messages/repositories/message.repository'

@QueryHandler(UserMessagesQuery)
export default class UserMessagesHandler implements IQueryHandler<UserMessagesQuery> {
  public async execute(query: UserMessagesQuery): Promise<Messages[]> {
    const messageRepository = getCustomRepository(MessageRepository)
    return messageRepository.find({ where: { userId: query.userId } })
  }
}

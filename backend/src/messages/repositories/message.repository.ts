import { EntityRepository, Repository, UpdateResult } from 'typeorm'

import Message from 'src/messages/models/messages.entity'

@EntityRepository(Message)
export default class MessageRepository extends Repository<Message> {
  async deleteMessage(messageId: string): Promise<UpdateResult> {
    return this.softDelete({ id: messageId })
  }
}

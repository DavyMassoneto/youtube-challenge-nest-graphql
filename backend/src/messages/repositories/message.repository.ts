import { EntityRepository, Repository } from 'typeorm'

import Message from 'src/messages/messages.entity'

@EntityRepository(Message)
export default class MessageRepository extends Repository<Message> {}

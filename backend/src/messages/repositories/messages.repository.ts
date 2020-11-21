import { EntityRepository, Repository } from 'typeorm'

import Message from 'src/messages/messages.entity'

@EntityRepository(Message)
export default class MessagesRepository extends Repository<Message> {}

import { EntityRepository, Repository } from 'typeorm'

import Message from 'src/messages/models/messages.entity'

@EntityRepository(Message)
export default class MessagesRepository extends Repository<Message> {}

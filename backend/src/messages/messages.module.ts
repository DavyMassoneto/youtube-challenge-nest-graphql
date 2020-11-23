import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'

import CreateMessageHandler from 'src/messages/commands/handlers/create-message.handler'
import DeleteMessageHandler from 'src/messages/commands/handlers/delete-message.handler'
import EditMessageHandler from 'src/messages/commands/handlers/edit-message.handler'
import MessagesResolver from 'src/messages/messages.resolver'
import MessageHandler from 'src/messages/queries/handlers/message.handler'
import MessagesHandler from 'src/messages/queries/handlers/messages.handler'
import UserMessagesHandler from 'src/messages/queries/handlers/user-messages.handler'
import MessageRepository from 'src/messages/repositories/message.repository'

const CommandHandlers = [CreateMessageHandler]
const QueryHandlers = [MessagesHandler, UserMessagesHandler, MessageHandler, DeleteMessageHandler, EditMessageHandler]
const EventHandlers = []

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([MessageRepository])],
  providers: [MessageRepository, MessagesResolver, ...CommandHandlers, ...QueryHandlers, ...EventHandlers],
})
export class MessagesModule {}

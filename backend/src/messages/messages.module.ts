import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'

import CreateMessageHandler from 'src/messages/commands/handlers/create-message.handler'
import MessagesResolver from 'src/messages/messages.resolver'
import MessageHandler from 'src/messages/queries/handlers/message.handler'
import MessagesHandler from 'src/messages/queries/handlers/messages.handler'
import UserMessagesHandler from 'src/messages/queries/handlers/user-messages.handler'
import MessagesRepository from 'src/messages/repositories/messages.repository'

const CommandHandlers = [CreateMessageHandler]
const QueryHandlers = [MessagesHandler, UserMessagesHandler, MessageHandler]
const EventHandlers = []

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([MessagesRepository])],
  providers: [MessagesRepository, MessagesResolver, ...CommandHandlers, ...QueryHandlers, ...EventHandlers],
})
export class MessagesModule {}

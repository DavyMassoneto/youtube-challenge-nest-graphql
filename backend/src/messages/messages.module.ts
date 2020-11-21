import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import MessageRepository from 'src/messages/repositories/message.repository'

@Module({
  imports: [TypeOrmModule.forFeature([MessageRepository])],
})
export class MessagesModule {}

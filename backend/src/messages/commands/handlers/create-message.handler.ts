import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { getCustomRepository } from 'typeorm'

import CreateMessageCommand from 'src/messages/commands/impl/create-message.command'
import Messages from 'src/messages/messages.entity'
import MessagesRepository from 'src/messages/repositories/messages.repository'
import CreateUserCommand from 'src/users/commands/impl/create-user.command'
import Users from 'src/users/users.entity'

@CommandHandler(CreateMessageCommand)
export default class CreateMessageHandler implements ICommandHandler<CreateMessageCommand> {
  constructor(private readonly commandBus: CommandBus) {}

  async execute(command: CreateMessageCommand): Promise<Messages> {
    const message = new Messages()
    message.content = command.content
    if (command.user.connect) {
      message.userId = command.user.connect.id
    } else {
      if (!command.user.create) {
        throw new Error(
          'Either pass a valid user id for the message or provide a new user using the create input option',
        )
      }
      const savedUser: Users = await this.commandBus.execute(new CreateUserCommand(command.user.create.email))
      message.userId = savedUser.id
    }
    const messageRepository = getCustomRepository(MessagesRepository)
    return messageRepository.save(message)
  }
}

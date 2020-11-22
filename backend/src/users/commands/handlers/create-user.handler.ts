import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { getRepository } from 'typeorm'

import CreateUserCommand from 'src/users/commands/impl/create-user.command'
import UserCreatedEvent from 'src/users/events/impl/user-created.event'
import Users from 'src/users/models/users.entity'

@CommandHandler(CreateUserCommand)
export default class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly eventBus: EventBus) {}

  async execute(command: CreateUserCommand): Promise<Users> {
    const usersRepository = getRepository(Users)
    const user = usersRepository.create()
    user.email = command.email.toLowerCase().trim()

    const userDB: Users = await usersRepository.save(user)

    this.sendEvent(userDB.id, this.eventBus)

    return userDB
  }

  private async sendEvent(userId: string, eventBus: EventBus) {
    if (userId !== undefined) {
      console.log('send event UserCreatedEvent')
      eventBus.publish(new UserCreatedEvent(userId))
    }
  }
}

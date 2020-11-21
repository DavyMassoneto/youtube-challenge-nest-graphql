import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'

import CreateUserHandler from 'src/users/commands/handlers/create-user.handler'
import UserCreatedEvent from 'src/users/events/impl/user-created.event'
import EmailUserHandler from 'src/users/queries/handlers/email-user.handler'
import UserHandler from 'src/users/queries/handlers/user.handler'
import UsersHandler from 'src/users/queries/handlers/users.handler'
import UserRepository from 'src/users/repositories/user.repository'
import UsersSaga from 'src/users/sagas/users.saga'
import UsersResolver from 'src/users/users.resolver'

const CommandHandlers = [CreateUserHandler]
const QueryHandlers = [UsersHandler, UserHandler, EmailUserHandler]
const EventHandlers = [UserCreatedEvent]

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([UserRepository])],
  providers: [UserRepository, UsersResolver, ...CommandHandlers, ...QueryHandlers, ...EventHandlers, UsersSaga],
})
export class UsersModule {}

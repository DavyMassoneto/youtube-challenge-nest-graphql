import { EventsHandler, IEventHandler } from '@nestjs/cqrs'

import UserCreatedEvent from 'src/users/events/impl/user-created.event'

@EventsHandler(UserCreatedEvent)
export default class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  handle(event: UserCreatedEvent): void {
    console.log(`UserCreatedEvent ${event.userId}`)
  }
}

import { Injectable } from '@nestjs/common'
import { ICommand, ofType, Saga } from '@nestjs/cqrs'
import { Observable } from 'rxjs'
import { delay, map } from 'rxjs/operators'

import UserCreatedEvent from 'src/users/events/impl/user-created.event'

@Injectable()
export default class UsersSaga {
  @Saga()
  userCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UserCreatedEvent),
      delay(1000),
      map(() => {
        console.log('Inside [UserSagas] saga for example send a email')
        return null
      }),
    )
  }
}

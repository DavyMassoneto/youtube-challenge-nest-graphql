import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { getRepository } from 'typeorm'

import UserQuery from 'src/users/queries/impl/user.query'
import Users from 'src/users/users.entity'

@QueryHandler(UserQuery)
export default class UserHandler implements IQueryHandler<UserQuery> {
  public async execute(query: UserQuery): Promise<Users> {
    const userRepo = getRepository(Users)
    return userRepo.findOne(query.userId)
  }
}

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { getRepository } from 'typeorm'

import Users from 'src/users/models/users.entity'
import UserQuery from 'src/users/queries/impl/user.query'

@QueryHandler(UserQuery)
export default class UserHandler implements IQueryHandler<UserQuery> {
  public async execute(query: UserQuery): Promise<Users> {
    const userRepo = getRepository(Users)
    return userRepo.findOne(query.userId)
  }
}

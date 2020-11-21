import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { getRepository } from 'typeorm'

import UsersQuery from 'src/users/queries/impl/users.query'
import Users from 'src/users/users.entity'

@QueryHandler(UsersQuery)
export default class UsersHandler implements IQueryHandler<UsersQuery> {
  public async execute(): Promise<Users[]> {
    const userRepo = getRepository(Users)
    return userRepo.find()
  }
}

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { getCustomRepository } from 'typeorm'

import Users from 'src/users/models/users.entity'
import EmailUserQuery from 'src/users/queries/impl/email-user.query'
import UserRepository from 'src/users/repositories/user.repository'

@QueryHandler(EmailUserQuery)
export default class EmailUserHandler implements IQueryHandler<EmailUserQuery> {
  public async execute(query: EmailUserQuery): Promise<Users> {
    const userRepo = getCustomRepository(UserRepository)
    return userRepo.findUserByEmail(query.email.toLowerCase().trim())
  }
}

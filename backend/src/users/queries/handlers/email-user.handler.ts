import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { getRepository } from 'typeorm'

import EmailUserQuery from 'src/users/queries/impl/email-user.query'
import Users from 'src/users/users.entity'

@QueryHandler(EmailUserQuery)
export default class EmailUserHandler implements IQueryHandler<EmailUserQuery> {
  public async execute(query: EmailUserQuery): Promise<Users> {
    const userRepo = getRepository(Users)
    return userRepo.findOne({ where: { email: query.email } })
  }
}

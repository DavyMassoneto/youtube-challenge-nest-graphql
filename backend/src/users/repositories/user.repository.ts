import { EntityRepository, Repository } from 'typeorm'

import Users from 'src/users/models/users.entity'

@EntityRepository(Users)
export default class UserRepository extends Repository<Users> {
  async findUserByEmail(email: string): Promise<Users> {
    return await this.findOne({ where: { email } })
  }
}

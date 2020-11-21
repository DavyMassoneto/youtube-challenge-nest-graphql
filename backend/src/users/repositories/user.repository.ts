import { EntityRepository, Repository } from 'typeorm'

import Users from 'src/users/users.entity'

@EntityRepository(Users)
export default class UserRepository extends Repository<Users> {}

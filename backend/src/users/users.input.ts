import { Field, InputType } from '@nestjs/graphql'

@InputType()
class UsersInput {
  @Field()
  readonly email: string
}

export default UsersInput

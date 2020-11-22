import { Field, InputType } from '@nestjs/graphql'

@InputType()
export default class AuthInput {
  @Field()
  readonly email: string
}

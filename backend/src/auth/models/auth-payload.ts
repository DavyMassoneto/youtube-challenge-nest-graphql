import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export default class AuthPayload {
  @Field()
  token: string
}

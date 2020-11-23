import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export default class AuthPayloadOutput {
  @Field()
  token: string
}

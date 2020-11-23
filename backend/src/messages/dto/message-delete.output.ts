import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export default class MessageDeleteOutput {
  @Field()
  status: boolean
}

import { Field, InputType } from '@nestjs/graphql'

@InputType()
export default class MessageDeleteInput {
  @Field()
  messageId: string
}

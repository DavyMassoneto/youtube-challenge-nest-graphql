import { Field, InputType } from '@nestjs/graphql'

@InputType()
export default class MessageEditInput {
  @Field()
  readonly content: string

  @Field()
  readonly userId: string
}

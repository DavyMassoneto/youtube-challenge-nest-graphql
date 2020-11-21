import { Field, InputType } from '@nestjs/graphql'

import UsersInput from 'src/users/users.input'

@InputType()
class MessageUserConnectInput {
  @Field()
  readonly id: string
}

@InputType()
export class MessageUserInput {
  @Field({ nullable: true })
  readonly connect: MessageUserConnectInput

  @Field({ nullable: true })
  readonly create: UsersInput
}

@InputType()
export default class MessagesInput {
  @Field()
  readonly content: string

  @Field()
  readonly user: MessageUserInput
}

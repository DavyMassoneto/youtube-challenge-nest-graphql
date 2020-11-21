import { MessageUserInput } from 'src/messages/messages.input'

export default class CreateMessageCommand {
  constructor(public readonly content: string, public readonly user: MessageUserInput) {}
}

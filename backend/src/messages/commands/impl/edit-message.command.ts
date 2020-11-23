export default class EditMessageCommand {
  constructor(public readonly messageId: string, public readonly content: string, public readonly userId: string) {}
}

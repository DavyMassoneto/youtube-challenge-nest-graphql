export default class DeleteMessageCommand {
  constructor(public readonly messageId: string, public readonly userId: string) {}
}

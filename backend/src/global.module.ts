import { Global, Module } from '@nestjs/common'
import { PubSub } from 'graphql-subscriptions'

@Global()
@Module({
  exports: [{ provide: 'PUB_SUB', useValue: new PubSub() }],
  providers: [{ provide: 'PUB_SUB', useValue: new PubSub() }],
})
export default class GlobalModule {}

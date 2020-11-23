import { UnauthorizedException } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { GqlModuleOptions } from '@nestjs/graphql/dist/interfaces/gql-module-options.interface'
import { JwtService } from '@nestjs/jwt'

import JwtValidateCommand from 'src/auth/commands/impl/jwt-validate.command'
import JwtDto from 'src/auth/dto/jwt.dto'
import DefaultObject from 'src/dto/default-object'
import { GqlContext } from 'src/dto/gql-context'

const graphqlFactory = async (commandBus: CommandBus, jwtService: JwtService): Promise<GqlModuleOptions> => ({
  autoSchemaFile: 'schema.gql',
  installSubscriptionHandlers: true,
  context: ({ req, res, payload, connection }: GqlContext) => ({ req, res, payload, connection }),
  subscriptions: {
    onConnect: async (connectionParams: DefaultObject) => {
      if (!connectionParams) {
        throw new UnauthorizedException()
      }
      const authorization = connectionParams.authorization || connectionParams.Authorization
      const authToken: string = authorization.split(' ')[1]
      const jwtPayload: any = jwtService.decode(authToken)

      const user: JwtDto = await commandBus.execute(new JwtValidateCommand(jwtPayload.userId))
      return { headers: { authorization: authorization }, user }
    },
  },
})

export default graphqlFactory

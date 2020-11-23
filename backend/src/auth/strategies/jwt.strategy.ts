import { Injectable } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import JwtValidateCommand from 'src/auth/commands/impl/jwt-validate.command'
import JwtDto from 'src/auth/dto/jwt.dto'
import Users from 'src/users/models/users.entity'

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly commandBus: CommandBus) {
    super({ jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() })
  }

  async validate(payload: JwtDto): Promise<Users> {
    return this.commandBus.execute(new JwtValidateCommand(payload.userId))
  }
}

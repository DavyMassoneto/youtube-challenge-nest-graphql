import JwtDto from 'src/auth/dto/jwt.dto'

export interface GqlContext {
  req: Request
  res: Response
  payload?: JwtDto
  // required for subscription
  connection: any
}

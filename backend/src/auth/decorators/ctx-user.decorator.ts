import { createParamDecorator } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

const CtxUser = createParamDecorator((data, ctx) => GqlExecutionContext.create(ctx).getContext().req.user)

export default CtxUser

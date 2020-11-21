import { Module } from '@nestjs/common'

import { AuthService } from 'src/auth/auth.service'

@Module({
  providers: [AuthService],
})
export class AuthModule {}
